// =====================================================
//  청첩장 정보 — 이 파일만 수정하면 됩니다.
// =====================================================
window.WEDDING = {
  groom: {
    name: "박지훈",
    order: "장남",
    father: "박OO",
    mother: "이OO",
    phone: "010-0000-0000",
  },
  bride: {
    name: "이서연",
    order: "장녀",
    father: "이OO",
    mother: "박OO",
    phone: "010-0000-0000",
  },

  // 예식 일시 (24시간제, 한국시간)
  date: "2027-05-15T12:30:00+09:00",

  venue: {
    name: "더채플앳청담",
    hall: "3층 그랜드홀",
    address: "서울특별시 강남구 선릉로 757",
    tel: "02-000-0000",
    // 오시는 길 안내 (원하는 만큼 추가/삭제)
    transport: [
      { title: "지하철", desc: "7호선 청담역 13번 출구 도보 5분" },
      { title: "버스", desc: "청담역 정류장 하차 — 간선 301, 342, 472" },
      { title: "주차", desc: "건물 내 지하주차장 2시간 무료" },
    ],
  },

  greeting: {
    title: "초대합니다",
    message:
      "서로가 마주보며 다져온 사랑을\n이제 함께 한 곳을 바라보며\n걸어갈 수 있는 큰 사랑으로 키우고자 합니다.\n\n저희 두 사람이 사랑의 이름으로\n지켜나갈 수 있게 앞날을\n축복해 주시면 감사하겠습니다.",
  },

  cover: "images/cover.svg",
  gallery: [
    "images/g1.svg",
    "images/g2.svg",
    "images/g3.svg",
    "images/g4.svg",
    "images/g5.svg",
    "images/g6.svg",
  ],

  // 마음 전하실 곳
  accounts: {
    groom: [
      { role: "신랑", name: "박지훈", bank: "국민은행", number: "000000-00-000000" },
      { role: "신랑 아버지", name: "박OO", bank: "신한은행", number: "000-000-000000" },
      { role: "신랑 어머니", name: "이OO", bank: "우리은행", number: "0000-000-000000" },
    ],
    bride: [
      { role: "신부", name: "이서연", bank: "카카오뱅크", number: "3333-00-0000000" },
      { role: "신부 아버지", name: "이OO", bank: "농협", number: "000-0000-0000-00" },
      { role: "신부 어머니", name: "박OO", bank: "하나은행", number: "000-000000-00000" },
    ],
  },

  // 배경음악 (mp3 파일을 넣고 경로 지정, 사용 안 하면 "")
  bgm: "",
};
