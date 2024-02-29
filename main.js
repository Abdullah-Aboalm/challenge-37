let request = new XMLHttpRequest();

request.onload = () => {
  if (request.status === 200 && request.readyState === 4) {
    let mainSpans = document.querySelectorAll(".main .front span");

    let data = JSON.parse(request.responseText);
    console.log(data);

    let allSpansText = document.querySelectorAll(".card .text span");
    let allPText = document.querySelectorAll(".card .text p");

    let dayCur = [];
    let dayPre = [];

    let weekCur = [];
    let weekPre = [];

    let monthCur = [];
    let monthPre = [];

    for (let i = 0; i < data.length; i++) {
      dayCur.push(data[i].timeframes.daily.current);
      dayPre.push(data[i].timeframes.daily.previous);
      weekCur.push(data[i].timeframes.weekly.current);
      weekPre.push(data[i].timeframes.weekly.previous);
      monthCur.push(data[i].timeframes.monthly.current);
      monthPre.push(data[i].timeframes.monthly.previous);
    }

    mainSpans.forEach((span) => {
      span.addEventListener("click", () => {
        mainSpans.forEach((span) => {
          span.classList.remove("active");
        });
        span.classList.add("active");
        if (span.classList.contains("active") && span.innerHTML === "Daily") {
          for (let i = 0; i < allSpansText.length; i++) {
            allSpansText[i].innerHTML = `${dayCur[i]}hrs`;
            allPText[i].innerHTML = `Last Week - ${dayPre[i]}hrs`;
          }
        } else if (
          span.classList.contains("active") &&
          span.innerHTML === "Monthly"
        ) {
          for (let i = 0; i < allSpansText.length; i++) {
            allSpansText[i].innerHTML = `${monthCur[i]}hrs`;
            allPText[i].innerHTML = `Last Week - ${monthPre[i]}hrs`;
          }
        } else {
          for (let i = 0; i < allSpansText.length; i++) {
            allSpansText[i].innerHTML = `${weekCur[i]}hrs`;
            allPText[i].innerHTML = `Last Week - ${weekPre[i]}hrs`;
          }
        }
      });
    });
  } else {
    console.log(Error("Invalid Json File"));
  }
};

request.open("get", "data.json");
request.send();
