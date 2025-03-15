/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import {Navigation, Pagination, Grid, Manipulation, Controller, EffectCreative, EffectFade} from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';
let bigSlider;
let miniSlider;
export let cards;
// Ініціалізація слайдерів
	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	if (document.querySelector('.slider-big')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		bigSlider = new Swiper('.slider-big', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation, Controller, EffectFade],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 800,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			 },
			// Події
			on: {
			
			}
		});
	}
	if (document.querySelector('.slider-mini')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		miniSlider = new Swiper('.slider-mini', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation, Controller, EffectCreative],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 800,
			effect: 'creative',
			grabCursor: true,
			creativeEffect: {
				prev: {
				  shadow: true,
				  translate: ["-50%", 0, -1],
				},
				next: {
				  translate: ["100%", 0, 0],
				},
			 },
			navigation: {
				prevEl: '.slider-mini__navigation .navigation-control__button--prev',
				nextEl: '.slider-mini__navigation .navigation-control__button--next',
			},
			on: {
			
			}
		});
	}
function initSliders() {
	if (document.querySelector('.body-projects__slider')) {
		cards = new Swiper('.body-projects__slider', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation, Pagination, Grid, Manipulation],
			observer: true,
			observeParents: true,
			slidesPerView: 2,
			slidesPerGroup: 2,
			spaceBetween: 32,
			grid: {
				rows: 2,
			},
			autoHeight: false,
			speed: 800,
			pagination: {
				el: '.body-projects__navigation .navigation-control__pagination',
				clickable: true,
				// type: "bullets"
			},
			navigation: {
				prevEl: '.body-projects__navigation .navigation-control__button--prev',
				nextEl: '.body-projects__navigation .navigation-control__button--next',
			},
			breakpoints: {
				280: {
					grid: {
						rows: 1,
					},
					slidesPerView: 1,
					spaceBetween: 20,
					slidesPerGroup: 1,
					pagination: {
						type: "fraction"
					},
				},
				767.98: {
					grid: {
						rows: 2,
					},
					slidesPerView: 2,
					spaceBetween: 32,
					slidesPerGroup: 2,
					pagination: {
						type: "bullets"
					},
				},
			},
			
			// Події
			on: {
				
			}
	});
	}
	bigSlider.controller.control = miniSlider;
	miniSlider.controller.control = bigSlider;
	
}
// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск ініціалізації слайдерів
	initSliders();
	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();
});