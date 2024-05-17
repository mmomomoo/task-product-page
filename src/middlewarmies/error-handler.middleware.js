import express from 'express';

// 1. **상품 상세 조회, 수정, 삭제 시** **상품이 없는 경우**에는 “**상품이 존재하지 않습니다.**” 메세지를 반환합니다. **상품 목록 조회 시** **상품이 없는 경우**에는 **빈 배열(`[]`)을 반환**합니다.
// 2. **상품 생성 시** 입력 받은 상품명이 **기존에 등록 된 상품명과 동일한 경우**에는 **“이미 등록 된 상품입니다.”** 메세지를 반환합니다.
// 3. **그 밖의 에러가 발생했을 때**에는 **“예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.”** 메세지를 반환합니다.

 = app.use((req, res, next) => {
  console.log('첫번째 미들웨어');
  next();
});

app.use((req, res, next) => {
  console.log('두번째 미들웨어');
  next();
});

app.get('/', (req, res, next) => {
  console.log('GET / 요청이 발생했습니다.');
  next();
});

app.use((req, res, next) => {
  console.log('세번째 미들웨어');
  res.json({ message: 'Hi' });
});

app.use((req, res, next) => {
  console.log('네번째 미들웨어');
  res.json({ message: '마지막 미들웨어 입니다.' });
});

// 1. **상품 생성 시 정보가 빠진 경우**, **“OOO을(를) 입력해 주세요.”** 메시지를 반환합니다.
// 예) ****“상품명을 입력해 주세요”, “담당자를 입력해 주세요.” 등…
// 2. **상품 수정, 삭제 시 비밀번호가 없는 경우**, **“비밀번호를 입력해 주세요.”** 메세지를 반환합니다.
// 3. **상품 수정 시** 상품 상태에 `**FOR_SALE**`, `**SOLD_OUT**` 이 외의 다른 값이 입력된 경우, **“상품 상태는 [FOR_SALE,SOLD_OUT] 중 하나여야 합니다.”** 메세지를 반환합니다.
