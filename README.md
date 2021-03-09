<p align="center">
<img width=200 height=275.5 src="https://user-images.githubusercontent.com/75964677/106723332-56837180-664a-11eb-94a0-7fcce1d46e9a.png">
</p>
<p align="center">비대면 진료부터 약배달까지, 닥터나우</p>

## Description

[Nest](https://docs.nestjs.com/)와 [TypeORM](https://typeorm.io/#/)을 이용해서 REST API 서버를 만드는 과제입니다.  
완성을 원하는 것이 아니라 코드 작성에 대한 과정 및 의도를 보려고 함이니 큰 부담 가지지 않으셔도 됩니다.  
진료를 위한 서버, 커뮤니티를 위한 서버가 있고, 두 서버에서 공통적으로 사용하는 도메인을 분리시켰습니다.

모든 서버 및 DB는 `docker-compose`를 이용해 가동시켜 주시면 됩니다.(도커가 설치돼있어야 합니다.)

완료 기간은 1주일 이내로 완료해주시면 되고, 해당 리포지토리를 clone하여 작성하신 후, origin을 따로 추가하여 개인 리포지토리의 url을 메일로 보내주시면 됩니다.

추가적으로 질문사항이나 궁금한 것이 있다면 [오픈채팅방](https://open.kakao.com/o/s1DHacVc)에서 질문 바랍니다.

## 서버 구동방법

### 1. 공통 도메인 빌드

```bash
cd commons
yarn install
yarn build
```

```bash
cd domains
yarn install
yarn build
```
### 2. 서버 구동

```shell
docker-compose up
```

## 과제

해당 요구사항에 맞춰 비즈니스 로직을 작성해주세요.

### 진료 서버

1. 유저는 의사 목록을 조회할 수 있음
1. 유저는 임의의 의사를 선택하여 진료요청서를 작성함
1. 의사는 자신이 받은 진료 요청서 목록을 조회할 수 있음
1. 의사는 임의의 진료 요청서를 선택하여 처방을 내릴 수 있음
1. 유저는 자신의 진료요청서 목록을 조회할 수 있음(추가)

### 예시

```ts
  /**
   * 유저가 진료를 요청하는 함수
   * @param userId 유저 아이디
   * @param doctorId 의사 아이디
   * @param symptom 증상(ex. 열이 나고 목이 아파요)
   */
  requestDiagnosis(userId: number, doctorId: number, symptom: string) {
    ...
    new Diagnosis(...);
    ...
  }

  /**
   * 의사가 처방을 내리는 함수
   * @param doctorId 의사 아이디
   * @param diagnosisId 진료요청서 아이디
   * @param comment 처방내용(ex. 해열제 처방)
   */
  prescribe(doctorId: number, diagnosisId: number, comment: string) {
    ...
  }
```

위와 같이 진료를 요청, 처방을 내리는 경우 임의의 문자열을 전달 받습니다.  

### 커뮤니티 서버

1. 유저는 게시물을 작성할 수 있음
1. 유저는 전체 게시물을 조회할 수 있음
1. 제목 및 작성자로 검색이 가능함
1. 임의의 게시물을 선택하여 본문을 조회할 수 있음
1. 유저는 자신의 게시물만 수정/삭제가 가능함
1. 의사는 게시물을 작성할 수 없으며, 유저가 작성한 게시물에 댓글만 작성할 수 있음
1. 의사 또는 유저로 회원가입 할 수 있음(추가)
1. 로그인 시 유저의 jwt token을 발급해줌(추가)

필요에 따라 엔티티 등은 자유롭게 수정 및 추가할 수 있으며 그에따라 DB 테이블의 수정 및 추가에 대한 제약은 없습니다.

가산점 항목

---

유저와 의사의 인증을 JWT로 구현  
객체지향적인 설계

## 채점방법

swagger를 이용해 작성하신 API 문서와 코드를 검토합니다.

# 해결한 이슈
docker 이슈 : https://github.com/EungyuCho/doctor-now-mission/issues/1