$(document).ready(() => {
  let ciCount = 0;
  let currentItem = $('.carousel-item.current');
  const carouselItems = $('.carousel-item');
  const carouselItemCount = carouselItems.length;
  if(carouselItemCount == 0) {
    return;
  }
  const carouselTrack = $('.carousel-track');
  const carouselWrap = $('.carousel-wrap');
  let itemSize = carouselWrap.width();
  carouselItems.css({ width: itemSize });
  carouselTrack.css({ width: itemSize * carouselItemCount});
  carouselItems.each(function() {
    ciCount += 1;
    $(this).attr('id', 'ci' + ciCount);
    if (ciCount === 1) {
      $('.carousel-pager-wrap').append(
        '<div id="cp' + ciCount + '" class="carousel-pager current"></div>'
      );
    } else {
      $('.carousel-pager-wrap').append(
        '<div id="cp' + ciCount + '" class="carousel-pager"></div>'
      );
    }
  });
  let currentPager = $('.carousel-pager.current');
  const carouselPagers = $('.carousel-pager');
  const toggleCurrent = () => {
    let nextItem = currentItem.next();
    if (nextItem.length === 0) {
      nextItem = $('#ci1');
    }
    currentItem.toggleClass('current');
    nextItem.toggleClass('current');
    currentPager.toggleClass('current');

    currentItem = nextItem;
    currentPager = $('#cp' + currentItem.attr('id').slice(2));
    currentPager.toggleClass('current');
  };
  const slideCurrent = () => {
    let currentItemNum = currentItem.attr('id').slice(2);
    let trackRight = (currentItemNum - 1) * itemSize;
    carouselTrack.css({ right: trackRight });
  };
  const resizeCarousel = () => {
    itemSize = carouselWrap.width();
    carouselItems.css({ width: itemSize });
    carouselTrack.css({ width: itemSize * carouselItemCount + 1 });
  };

  const toggleSlide = () => {
    toggleCurrent();
    slideCurrent();
  };
  $(window).resize(resizeCarousel);
  const autoCarousel = window.setInterval(toggleSlide, 4000);
  carouselPagers.on('click', function() {
    window.clearInterval(autoCarousel);
    let clickedPager = $(this);
    clickedPager.toggleClass('current');
    currentPager.toggleClass('current');
    currentPager = clickedPager;
    currentItem.toggleClass('current');
    currentItem = $('#ci' + clickedPager.attr('id').slice(2));
    currentItem.toggleClass('current');
    slideCurrent();
    autoCarousel = window.setInterval(toggleSlide, 4000);
  });
});