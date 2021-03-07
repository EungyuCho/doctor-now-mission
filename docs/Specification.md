# 진료서버
유저는 의사 리스트를 조회할 수 있음<br/>
GET api/doctor<br/>
유저는 임의의 의사를 선택하여 진료요청서를 작성함<br/>
POST api/doctor/diagnosis<br/>
의사는 자신이 받은 진료 요청서 목록을 조회할 수 있음<br/>
GET api/diagnosis<br/>
의사는 임의의 진료 요청서를 선택하여 처방을 내릴 수 있음<br/>
POST api/diagnosis<br/>


# 커뮤니티 서버
의사 또는 유저가 회원가입 할 수 있어야 함<br/>
POST api/user/createAccount<br/>
로그인 시 token을 받을 수 있어야 함<br/>
POST api/user/login<br/>
유저는 게시물을 작성할 수 있음<br/>
POST api/board<br/>
유저는 전체 게시물을 조회할 수 있음<br/>
GET api/board<br/>
제목 및 작성자로 조회 가능함<br/>
GET api/board?author=' '&title=' '<br/>
임의의 게시물을 선택하여 본문을 조회할 수 있음<br/>
GET api/board/content?boardId=' '<br/>
유저는 자신의 게시물만 수정/삭제가 가능함<br/>
PUT api/board<br/>
DELETE api/board<br/>
의사는 게시물을 작성할 수 없으며, 유저가 작성한 게시물에 댓글만 작성할 수 있음<br/>
POST api/board/comment<br/>