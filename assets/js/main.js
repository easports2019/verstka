// Initialise Carousel
const mainCarousel = new Carousel(document.querySelector("#mainCarousel"), {
  Dots: false,
});

// Thumbnails
const thumbCarousel = new Carousel(document.querySelector("#thumbCarousel"), {
  Sync: {
    target: mainCarousel,
    friction: 0,
  },
  Dots: false,
  Navigation: false,
  center: false,
  slidesPerPage: 1,
  infinite: false,
});

// Customize Fancybox
Fancybox.bind('[data-fancybox="gallery"]', {
  Carousel: {
    on: {
      change: (that) => {
        mainCarousel.slideTo(mainCarousel.findPageForSlide(that.page), {
          friction: 0,
        });
      },
    },
  },
});


const calcBids = () => {
  let rows = Array.from(document.getElementsByClassName("b-group-phrase"))
  let long_p = ""

  let row_objects = rows.map(row => {
    let tds = row.getElementsByTagName("td")
    return {
      id: row.id,
      phrase: tds[0].innerText,
      shows: +tds[1].innerText,
      clicks: +tds[2].innerText,
      ctr: +tds[3].innerText,
      bid: +tds[5].getElementsByTagName("input")[0].value,
      bidId: tds[5].getElementsByTagName("input")[0].id,
      trafic: +tds[6].innerText ?? 0,
    }

  })

  console.log('row_objects',row_objects)

  const max_bid = 85

  const modified = row_objects.map(row => {
    let local_max_bid = row.bid > max_bid ? row.bid : max_bid

    const phrases = ["моск","ярослав","костром","чухлом","иванов","заказ","ключ"]
    let koef = 1;
    let found = false;
    //1
    phrases.map(p => {
      if (row.phrase.indexOf(p) >= 0)
        found = true
    })
    if (found) 
      koef += 0.15

    //2
    found = false
    if (row.show > 0)
      koef += 0.15
    else
      koef += 0.1
    
    row.bid = Math.floor(row.bid * koef)

    if (row.bid > local_max_bid)
      row.bid = max_bid

      long_p += row.bid + ","
    return row
  });

  console.log('modified',modified)
  console.log('long_p',long_p)

 /* modified.forEach(row => {
    if (+document.getElementById(row.bidId).value != +row.bid)
      document.getElementById(row.bidId).style = "border: 1px solid red"
    document.getElementById(row.bidId).value = row.bid.toString() + ".00"
  });*/

}