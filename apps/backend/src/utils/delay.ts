export async function delay(second: number) {
  function sleep(second: number) {
    let duration = second - 1;
    return new Promise(function (resolve) {
      const countDown = setInterval(() => {
        console.log(`${duration} seconds left`);
        duration--;
        if (duration === 0 || duration < 0) clearInterval(countDown);
      }, 1000);
      setTimeout(resolve, second * 1000);
    });
  }

  console.log(`Serving in ${second} seconds`);
  await sleep(second);
  console.log("Finish sleeping");
}
