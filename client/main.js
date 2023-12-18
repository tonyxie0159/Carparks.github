//安裝提示
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('installButton').style.display = 'block';
});

document.getElementById('installButton').addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    }
});

//用戶定位請求
async function getUserPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let data = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    resolve(data);
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            console.error("用戶拒絕定位請求");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            console.error("無法取得用戶定位");
                            break;
                        case error.TIMEOUT:
                            console.error("定位請求超時");
                            break;
                        case error.UNKNOWN_ERROR:
                            console.error("發生未知錯誤");
                            break;
                    }
                    reject(error);
                }
            );
        } else {
            console.error("不支援此瀏覽器");
            reject(new Error("不支援此瀏覽器"));
        }
    });
}

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const data = await getUserPosition();
    } catch (error) {
        console.error("錯誤:", error);
    }
});


//渲染table
function renderDataToTable(data) {
    const table = document.getElementById("data-table").getElementsByTagName("tbody")[0];

    // 清空表格
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    data.forEach((item) => {
        const row = table.insertRow();

        // 顯示停車場名稱和剩餘空位
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);

        cell1.innerHTML = item.CarParkName;
        cell2.innerHTML = item.AvailableSpaces;

        // 添加更多資訊按鈕
        const moreInfoButton = document.createElement("button");
        moreInfoButton.type = "button";
        moreInfoButton.classList.add("btn", "btn-primary");
        moreInfoButton.textContent = "更多資訊";
        moreInfoButton.addEventListener("click", () => {
            showMoreInfoModal(item);
        });
        cell3.appendChild(moreInfoButton);
        //添加導航按鈕
        const googleMapButton = document.createElement("button");
        googleMapButton.type = "button";
        googleMapButton.classList.add("btn", "btn-primary");
        googleMapButton.textContent = "導航";
        googleMapButton.addEventListener("click", async () => {
            try {
                const carparkName = item.CarParkName;
                const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(carparkName)}`;
                window.open(url, '_blank');
            } catch (error) {
                console.error(error);
            }
            
        });
        cell4.appendChild(googleMapButton);
    });
}

// 顯示更多資訊的彈窗
function showMoreInfoModal(item) {
    Swal.fire({
        title: '更多資訊',
        html: `<p>連絡電話：${item.Telephone}</p>
               <p>地址：${item.Address}</p>
               <p>總車位：${item.TotalSpaces}</p>
               <p>距離(公里)：${item.CarParkDistance}</p>
               <p>營業狀況：${item.ServiceStatus === 1 ? '營業中' : (item.ServiceStatus === 0 ? '未營業' : '錯誤')}</p>`,
        showCloseButton: true,
        confirmButtonText: '確定'
    });
}



document
    .getElementById("searchButton")
    .addEventListener("click", async () => {

        // 檢查字串是否只包含中文、英文和數字
        function isValidInput(input) {
            const regex = /^$|^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
            return regex.test(input);
        }

        const data = await getUserPosition();
        //獲得搜索欄內容
        const keyword = document.getElementById("searchInput").value;

        // 建立URL
        const searchURL = `/search?keyword=${keyword}`;

        const selectedOption = document.getElementById("inputState").value;

        const dataToSend = {
            selectedOption: selectedOption,
            data: data,
        };

        //搜尋欄字元合法才與後端交互
        if (isValidInput(keyword)) {
            fetch("/api" + `${searchURL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            })
                .then((response) => response.json())
                .then((data) => {
                    renderDataToTable(data);
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            searchInput.value = '';
            alert('搜尋欄只允許中文、英文和數字，請不要包含其他符號。');
        }


    });

//將用戶定位傳給server，將server回傳結果渲染到表格
document
    .getElementById("getLocationButton")
    .addEventListener("click", async () => {
        const data = await getUserPosition();
        fetch("/api/location", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                //將結果渲染到表格
                renderDataToTable(data);
            })
            .catch((err) => {
                console.error(
                    "There was a problem with the fetch operation:",
                    err
                );
            });
    });