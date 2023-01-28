
  const newMemo = {
    memo: 'thdud', 
    memo_id: Math.floor(new Date().getTime() + Math.random())
  }

  const memoList = {
    id: 1670918735068,
    title: "수정합니다 가능합니까?",
    date: "2022-12-16",
    contents: "자고싶네요 ㅋㅋ",
    emotion: "😤",
    is_edit: false,
    memo: [
      {
        memo: "오늘의 일기 메모11",
        memo_id: 1
      }
    ]
  }
  memoList.memo.push(newMemo)
  // const new = 
  console.log(memoList)
