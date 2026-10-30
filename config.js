// =====================================================
//  청첩장 정보 — 이 파일만 수정하면 됩니다.
// =====================================================
window.WEDDING = {
  groom: {
    name: "김준호",
    order: "장남",
    father: "김OO",
    mother: "OOO",
    phone: "010-0000-0000",
  },
  bride: {
    name: "히가시 나츠호",
    order: "장녀",
    father: "히가시 OO",
    mother: "OOO",
    phone: "010-0000-0000",
  },

  // 예식 일시 (24시간제, 한국시간)
  date: "2027-01-23T17:00:00+09:00",

  venue: {
    name: "파티움하우스 수원",
    hall: "",
    address: "경기도 수원시 팔달구 효원로 289",
    tel: "031-221-3434",
    // 오시는 길 안내 (원하는 만큼 추가/삭제)
    transport: [
      { title: "지하철", desc: "수인분당선 수원시청역 하차, 도보 약 3분" },
      { title: "주차", desc: "웨딩홀 주차장 이용 가능" },
    ],
  },

  greeting: {
    title: "초대합니다",
    message:
      "서로가 마주보며 다져온 사랑을\n이제 함께 한 곳을 바라보며\n걸어갈 수 있는 큰 사랑으로 키우고자 합니다.\n\n저희 두 사람이 사랑의 이름으로\n지켜나갈 수 있게 앞날을\n축복해 주시면 감사하겠습니다.",
  },

  cover: "images/HAN01034.jpg",
  gallery: [
    "images/HAN00006.jpg",
    "images/HAN00308.jpg",
    "images/HAN00523.jpg",
    "images/HAN00944.jpg",
    "images/HAN01034.jpg",
    "images/HAN01509.jpg",
    "images/HAN01661.jpg",
    "images/HAN01859.jpg",
  ],

  // 마음 전하실 곳
  accounts: {
    groom: [
      { role: "신랑", name: "김준호", bank: "OO은행", number: "000-000-000000" },
      { role: "신랑 아버지", name: "김OO", bank: "OO은행", number: "000-000-000000" },
      { role: "신랑 어머니", name: "OOO", bank: "OO은행", number: "000-000-000000" },
    ],
    bride: [
      { role: "신부", name: "히가시 나츠호", bank: "OO은행", number: "000-000-000000" },
      { role: "신부 아버지", name: "히가시 OO", bank: "OO은행", number: "000-000-000000" },
      { role: "신부 어머니", name: "OOO", bank: "OO은행", number: "000-000-000000" },
    ],
  },

  // 배경음악 (mp3 파일을 넣고 경로 지정, 사용 안 하면 "")
  bgm: "",
};
