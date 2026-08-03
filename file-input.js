const uploadBtn = document.querySelector("#uploadBtn");
const imageInput = document.querySelector("#imageInput");
const titleInput = document.querySelector("#titleInput");

uploadBtn.addEventListener("click", async function upLoad() {
  try {
    //1. 사용자가 선택한 파일 가져오기
    const imageFiles = imageInput.files[0];
    //.files 속성은 input type ="file" 이 갖고 있는 속성이다.
    //이는 input에 등록한 파일들을 '배열처럼' 갖고 있는다

    //2. FormData 객체 만들기
    //FormData 객체는 JS에서 제공하는 생성자이다.
    //FormData에는 .append라는 속성이 내장되어있다.
    const formData = new FormData();
    formData.append("image", imageFiles);
    formData.append("title", titleInput.value);

    //3. fetch로 전송 - 업로드 기능의 API 엔드포인트 주소 사용
    //현재 ${BASE_URL} 은 따로 정해져 있지 않음 (연습용)
    const response = await fetch(`${BASE_URL}/upload`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`HTTP 에러: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("업로드 성공", result);
  } catch (error) {
    console.log("업로드 실패", error.message);
  }
});
