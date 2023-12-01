# 選擇 Node.js 的基礎映像檔
FROM node:18

# 設置工作目錄，WORKDIR 是 Dockerfile 的指令，用來設置在容器內部用於存儲應用程式檔案的目錄。
WORKDIR /usr/src/app

# 首先複製 package.json package-lock.json到工作目錄
COPY package.json ./

# 將本地的 .env 文件複製到容器中
COPY .env /path/in/container/.env

#複製運行腳本
COPY start.sh .

# 安裝套件
RUN npm install

RUN npm install -g pm2

#設定.sh腳本執行權限
RUN chmod +x start.sh

# 複製全部應用程式碼到工作目錄，從當前目錄到docker目錄
COPY . .

#設置PORT
EXPOSE 3000

#啟動指令
CMD ["pm2-runtime","app.js"]


# docker run <image>：從映像檔建立並啟動一個新的容器。
# docker ps：列出正在運行的容器。
# docker stop <container>：停止一個容器。
# docker ps -a ：列出所有容器，包含停止的容器。
# docker rm <container>：移除一個容器。
# docker images：列出本地的所有映像檔。
# docker rmi <image>：移除一個映像檔。
# docker pull <image>：從 Docker Hub 或其他 Docker Registry 下載一個映像檔。
# docker build -t <image> .：從當前目錄的 Dockerfile 建立一個新的映像檔。
# docker exec -it <container> bash：進入一個正在運行的容器的 bash shell。
# docker run -d -p 8080:3000 <image名稱:tag> ：在背景運行
