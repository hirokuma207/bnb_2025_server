FROM node:22
# 시간대를 서울로 설정
RUN apt-get update && apt-get install -y tzdata
ENV TZ=Asia/Seoul

# 작업 디렉토리
WORKDIR /app
COPY . .
# node 의존성 설치
RUN npm install
# 앱 실행 포트
EXPOSE 18000
# 앱 실행
CMD ["npm", "run", "start"]