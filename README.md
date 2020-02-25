# ez-carousel
An extremely easy to use carousel that can go anywhere and hold anything. Super lightweight and minimally styled to allow for total creative freedom.

## Usage
Simply put a div with the `carousel-wrap` class anywhere. Inside that, put a div with the class `carousel-track`. Inside that, create your slides by adding divs with the class `carousel-item` with whatever you want inside of them.

If you want to include pagers (buttons under the slides you can click on to choose a slide), just add a div with the class `carousel-pager-wrap` after the `carousel-track` div.

[See it in action!](https://abalejr.github.io/ez-carousel/)

### Example:
```
<div class="carousel-wrap">
    <div class="carousel-track">
        <div class="carousel-item">
            ... Whatever your heart desires
        </div>
        <div class="carousel-item">
            ... More of whatever your heart desires
        </div>
    </div>
    <div class="carousel-pager-wrap"></div>
</div>
```