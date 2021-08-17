# 리액트 캘린더 일정 관리 프로젝트

### 개발환경
- Windows 10
- [Nodejs 16.6.2](https://nodejs.org/ko/)
- [Docker Desktop for Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows/)
  - Engine v20.10.7
  - docker-compose v1.29.2
- Webstorm

### 기술스택
- DB
  - Postgresql (by Docker)
- Backend
  - nodejs express
  - [sequelize (ORM)](https://sequelize.org/master/)
- Frontend
  - React
  - typescript
  - [recoil](https://recoiljs.org/ko/)

### 설치
```
git clone https://github.com/sbjang123456/calendar-scheduling.git
cd calendar-scheduling
docker-compose up -d
npm install -g yarn
yarn
```

### 구동
```
yarn dev
```

### 기능설명
