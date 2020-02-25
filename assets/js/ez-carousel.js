$(document).ready(() => {
  // Check for carousel items, terminate if none found
  const carouselItems = $('.carousel-item'),
        carouselItemCount = carouselItems.length;
  if(carouselItemCount == 0) {
    return;
  }

  // Set up carousel track
  const carouselTrack = $('.carousel-track'),
        carouselWrap = $('.carousel-wrap');
  let itemSize = carouselWrap.width();
  carouselItems.css({ width: itemSize });
  carouselTrack.css({ width: itemSize * carouselItemCount});

  // Create carousel pagers
  let ciCount = 0;
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

  // Helper Functions
  let currentItem = $('.carousel-item.current'),
      currentPager = $('.carousel-pager.current');
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

  // Start autoscroll
  let autoCarousel = window.setInterval(toggleSlide, 4000);

  // Handle pager click
  const carouselPagers = $('.carousel-pager');
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

  // Resize carousel items when screen is resized
  $(window).resize(resizeCarousel);
});