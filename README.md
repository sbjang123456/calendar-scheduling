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
    > 일정 저장을 위한 DBMS 구성. 로컬에서 쉽고 빠르게 구성할 수 있는 Docker 사용
- Backend
  - nodejs express
    > 일정 조회, 등록, 수정, 삭제를 위한 API 서버 구성
  - [sequelize (ORM)](https://sequelize.org/master/)
    > DBMS 종속성이 적은 ORM 사용
- Frontend
  - [CRA (Create React App)](https://github.com/facebook/create-react-app)
    > 리액트 템플릿 초기 셋팅 (npx create-react-app calendar-sheduling --template typescript)
  - React
    > 컴포넌트 단위 개발로 인한 재사용성이 뛰어남
  - typescript
    > 정적 타입 분석으로 인한 에러 방지
  - [recoil](https://recoiljs.org/ko/)
    > 상태관리 라이브러리. React hooks 개념과 유사해서 사용 편리함.


### 설치
```shell
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
