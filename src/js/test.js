// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

import { cards } from "./sliders.js";

window.addEventListener('load', windowLoad);

function windowLoad() {
   document.addEventListener('click', slideActions);
   document.documentElement.classList.add('loaded');

//убирание картинки при добавлении элемента (начало)---------------------------------------------

   const itemExperience = document.querySelectorAll('.item-experience');
   if(itemExperience.length > 4) {
      itemExperience.forEach(function(item, index) {
         if(index === 3) {
            item.classList.add('item-experience--reset');
         }
      })
   }

//активное меню-------------------------------------------------------------------------

   const menu = document.querySelector('.projects__navigation');
   let menuActiveElement;

   if(menu) {
      menuActiveElement = document.querySelector('.navigation-projects__active span');

      const menuActiveItem = menu.querySelector('.navigation-projects__item._active');

      menuActiveItem ? menuSetActive(menuActiveItem) : null;

      menu.addEventListener('click', menuActions);
   }

   function menuActions(e) {
      const menuItem = e.target;
      if(menuItem.closest('.navigation-projects__item')) {
         const menuParentItem = menuItem.closest('.navigation-projects__item');
         const menuActiveItem = menu.querySelector('.navigation-projects__item._active');

         if(!menuParentItem.classList.contains('_active')) {
            menuActiveItem ? 
            menuActiveItem.classList.remove('_active') : null;
         }
         menuSetActive(menuParentItem);
         e.preventDefault();
      }
   }

   function menuSetActive(menuParentItem) {
      menuParentItem.classList.add('_active');
      menuActiveElement.style.cssText = `
         height: ${menuParentItem.offsetHeight}px;
         top: ${menuParentItem.offsetTop}px;
         background-color: #2947A9;
      `;
   }

//Звездочка полей ввода========================================================================================================================================================

const inputs = document.querySelectorAll('.form-subscribe__input');
inputs.forEach(input => {
   input.addEventListener("focusin", function (e) {
      const targetElement = e.target;
      if (targetElement.tagName === 'INPUT') {
         //   targetElement.classList.add('no-star');
           targetElement.parentElement.classList.add('no-star');
      }
   });
   input.addEventListener("focusout", function (e) {
      const targetElement = e.target;
      if ((targetElement.tagName === 'INPUT' & targetElement.value.length === 0)) {
         //  targetElement.classList.remove('no-star');
          targetElement.parentElement.classList.remove('no-star');
      }
   });
});


//Фильтрация слайдов (адаптированная под активное меню)========================================================================================================================================================
const elements = document.querySelectorAll('.slide-items');
const elementsArray = Array.from(elements);

function slideActions(e) {
	const targetElement = e.target;

	if(targetElement.closest('.navigation-projects__item')) {
      const parentItem = targetElement.closest('.navigation-projects__item');
		const elementType = parentItem.dataset.projectType;

		cards.slideTo(0, 0);
		cards.removeAllSlides();

		elementsArray.forEach(element => {
			if(!elementType || element.dataset.projectType === elementType) {
            element.classList.add('scale-in');
				cards.appendSlide(element.outerHTML);
			}
		});

      slideLength();
      cards.update();

	}
}

function slideLength() {

   const contentHeight = document.querySelector('.projects__content');
   const bodyHeight = document.querySelector('.body-projects');
   const slidesParent = document.querySelector('.body-projects__wrapper');
   const slides = slidesParent.querySelectorAll('.slide-items');

   if (slides.length === 1 && window.innerWidth > 767.98) {
      bodyHeight.classList.add('quantity-change-1element');
      bodyHeight.classList.remove('quantity-change-2elements');
      contentHeight.classList.remove('quantity-change-content');
      cards.params.slidesPerView = 1;
      cards.params.grid.rows = 1;
   } else if (slides.length === 2 && window.innerWidth > 767.98) {
      bodyHeight.classList.add('quantity-change-2elements');
      contentHeight.classList.add('quantity-change-content');
      bodyHeight.classList.remove('quantity-change-1element');
      cards.params.slidesPerView = 1;
      cards.params.grid.rows = 1;
   } else if (window.innerWidth < 767.98) {
      cards.params.grid.rows = 1;
      cards.params.slidesPerView = 1;
   }  else {
      bodyHeight.classList.remove('quantity-change-1element');
      bodyHeight.classList.remove('quantity-change-2elements');
      contentHeight.classList.remove('quantity-change-content');
      cards.params.slidesPerView = 2;
      cards.params.grid.rows = 2;
   }  

}
//========================================================================================================================================================

}

//Черновики========================================================================================================================================================

// function documentActions(e) {
// 	const targetElement = e.target;

// 	if(targetElement.classList.contains('navigation-projects__category') && !targetElement.classList.contains('active')) {
// 		const activeElement = document.querySelector('.navigation-projects__category.active');
// 		const elementType = targetElement.dataset.projectType;

// 		activeElement.classList.remove('active');
//       targetElement.classList.add('active');
// 		cards.slideTo(0, 0);
// 		cards.removeAllSlides();

// 		elementsArray.forEach(element => {
// 			if(!elementType || element.dataset.projectType === elementType) {
//             element.classList.add('scale-in');
// 				cards.appendSlide(element.outerHTML);
// 			}
// 		});
//       slideLength();
//       cards.update();
// 	}
// }

//------------------------------------------------------------------------------------------------------------------------------------

// document.body.addEventListener("focusin", function (e) {
//    const targetElement = e.target;
//    if ((targetElement.tagName === 'INPUT') & !targetElement.closest('.footer__form')) {
//         targetElement.classList.add('no-star');
//         targetElement.parentElement.classList.add('no-star');
//    }
// });
// document.body.addEventListener("focusout", function (e) {
//    const targetElement = e.target;
//    if ((targetElement.tagName === 'INPUT' & targetElement.value.length === 0)) {
//       // if ((targetElement.tagName === 'INPUT' & targetElement.value.length === 0))
//        targetElement.classList.remove('no-star');
//        targetElement.parentElement.classList.remove('no-star');
//    }
// });

//========================================================================================================================================================
