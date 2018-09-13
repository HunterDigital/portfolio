// smooth scroll

$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        //window.location.hash = hash;
      });
    } // End if
  });
});
//illuminate navbar elements according to position
var windowWidth = window.innerWidth;

var parallaxHeight = $('.parallax').height();
var aboutHeight = parallaxHeight + $('.about').height() + $('.nav').height();
var portfolioHeight = aboutHeight + $('.portfolio').height();
var contactHeight = portfolioHeight + $('.contact').height();

$( window ).resize(function() { //przy zmianie wymiarow okna aktualizuj wysokości
    parallaxHeight = $('.parallax').height();
    aboutHeight = parallaxHeight + $('.about').height() + $('.nav').height();
    portfolioHeight = aboutHeight + $('.portfolio').height();
    contactHeight = portfolioHeight + $('.contact').height();

    windowWidth = window.innerWidth;

});
console.log(`parallaxHeight to ${parallaxHeight}, a aboutHeight to ${aboutHeight}, portfolioHeight to ${portfolioHeight}, windows width is currently ${windowWidth}.`); 
var active_element;


var toggle_active = (active_el) => {
    $('.selected').removeClass('selected');
    $(active_el).addClass('selected');
};
//toggluj klasę selected gdy jesteś w innej sekcji dokumentu
$(window).scroll(()=>{
    if ($(document).scrollTop() < parallaxHeight)
        {
            active_element = '.nav__parallax';
            toggle_active(active_element);
            $('.nav').removeClass('under');
            $('.nav__blank').removeClass('nav--active');
        }
    if (($(document).scrollTop() > parallaxHeight) && ($(document).scrollTop() < aboutHeight))
        {
            active_element = '.nav__about';
            toggle_active(active_element);
            $('.nav').addClass('under');
            $('.nav__blank').addClass('nav--active');
        }
    if (($(document).scrollTop() > aboutHeight) && ($(document).scrollTop() < portfolioHeight))
        {
            active_element = '.nav__portfolio';
            toggle_active(active_element);
        }
    if (($(document).scrollTop() > portfolioHeight))
        {
            active_element = '.nav__contact';
            toggle_active(active_element);
        }
    
    
});
/*
do zrobienia:
- funkcja się psuje gdy zmieniana jest wysokość okna po odpaleniu dokumentu.
- ograniczyć aktualizacje wysokosci elementow do 1 na sek.


*/

//show navigation under parallax
var test = $('.nav').height();
console.log(test);

// Parallax effect

var pContainerHeight = document.querySelector('.parallax').offsetHeight;

    window.addEventListener('scroll', function(){

      var wScroll = this.pageYOffset;

      if (wScroll <= pContainerHeight) {

        
        document.querySelector('.layer--2').style.
          transform = 'translate(0px, '+ wScroll /60 +'%)';
        document.querySelector('.layer--3').style.
          transform = 'translate(0px, '+ wScroll /40 +'%)';
        document.querySelector('.layer--4').style.
          transform = 'translate(0px, '+ wScroll /20 +'%)';

  }
});

//Typer effect

var Typer = function(element) {
  this.element = element;
  var delim = element.dataset.delim || ","; // default to comma
  var words = element.dataset.words || "override these,sample typing";
  this.words = words.split(delim).filter(function(v){return v;}); // non empty words
  this.delay = element.dataset.delay || 200;
  this.loop = element.dataset.loop || "true";
  this.deleteDelay = element.dataset.deletedelay || element.dataset.deleteDelay || 800;

  this.progress = { word:0, char:0, building:true, atWordEnd:false, looped: 0 };
  this.typing = true;

  var colors = element.dataset.colors || "black";
  this.colors = colors.split(",");
  this.element.style.color = this.colors[0];
  this.colorIndex = 0;

  this.doTyping();
};

Typer.prototype.start = function() {
  if (!this.typing) {
    this.typing = true;
    this.doTyping();
  }
};
Typer.prototype.stop = function() {
  this.typing = false;
};
Typer.prototype.doTyping = function() {
  var e = this.element;
  var p = this.progress;
  var w = p.word;
  var c = p.char;
  var currentDisplay = [...this.words[w]].slice(0, c).join("");
  p.atWordEnd = false;
  if (this.cursor) {
    this.cursor.element.style.opacity = "1";
    this.cursor.on = true;
    clearInterval(this.cursor.interval);
    var itself = this.cursor;
    this.cursor.interval = setInterval(function() {itself.updateBlinkState();}, 400);
  }

  e.innerHTML = currentDisplay;

  if (p.building) {
    if (p.char == [...this.words[w]].length) {
      p.building = false;
      p.atWordEnd = true;
    } else {
      p.char += 1;
    }
  } else {
    if (p.char == 0) {
      p.building = true;
      p.word = (p.word + 1) % this.words.length;
      this.colorIndex = (this.colorIndex + 1) % this.colors.length;
      this.element.style.color = this.colors[this.colorIndex];
    } else {
      p.char -= 1;
    }
  }

  if(p.atWordEnd) p.looped += 1;

  if(!p.building && (this.loop == "false" || this.loop <= p.looped) ){
    this.typing = false;
  }

  var myself = this;
  setTimeout(function() {
    if (myself.typing) { myself.doTyping(); };
  }, p.atWordEnd ? this.deleteDelay : this.delay);
};

var Cursor = function(element) {
  this.element = element;
  this.cursorDisplay = element.dataset.cursordisplay || "_";
  element.innerHTML = this.cursorDisplay;
  this.on = true;
  element.style.transition = "all 0.1s";
  var myself = this;
  this.interval = setInterval(function() {
    myself.updateBlinkState();
  }, 400);
}
Cursor.prototype.updateBlinkState = function() {
  if (this.on) {
    this.element.style.opacity = "0";
    this.on = false;
  } else {
    this.element.style.opacity = "1";
    this.on = true;
  }
}

function TyperSetup() {
  var typers = {};
  var elements = document.getElementsByClassName("typer");
  for (var i = 0, e; e = elements[i++];) {
    typers[e.id] = new Typer(e);
  }
  var elements = document.getElementsByClassName("typer-stop");
  for (var i = 0, e; e = elements[i++];) {
    let owner = typers[e.dataset.owner];
    e.onclick = function(){owner.stop();};
  }
  var elements = document.getElementsByClassName("typer-start");
  for (var i = 0, e; e = elements[i++];) {
    let owner = typers[e.dataset.owner];
    e.onclick = function(){owner.start();};
  }

  var elements2 = document.getElementsByClassName("cursor");
  for (var i = 0, e; e = elements2[i++];) {
    let t = new Cursor(e);
    t.owner = typers[e.dataset.owner];
  }
}

TyperSetup();


//gallery prototype
class Slide {
  constructor(width, defaultWidth, backgroundColor, backgroundImage, textColor, leftOffset, hasSlider, headerText, headerDesc, headerDescOffset, headerParagraph) {
    this.width = width;
    this.defaultWidth = defaultWidth;
    this.backgroundColor = backgroundColor;
    this.backgroundImage = backgroundImage;
    this.textColor = textColor;

    this.leftOffset = leftOffset;

    this.hasSlider = hasSlider;

    this.headerText = headerText;
    this.headerDesc = headerDesc;
    this.headerDescOffset = headerDescOffset;
    this.headerParagraph = headerParagraph;
  }
}

const Slide1 = new Slide(false, false, '#4cd137','url(https://picsum.photos/2000/600/?random)', '#2c841e', '4rem', false, 'Forkify', 'Projekt osobisty', '8.4rem', 'Officia dolore aliqua voluptate sit elit magna reprehenderit. Mollit nulla cillum ex ex duis consectetur nulla elit. Pariatur mollit est ea laboris ea pariatur sit.Officia dolore aliqua voluptate sit elit magna reprehenderit.');
const Slide2 = new Slide('100%', '23rem', '#fbc531','url(https://picsum.photos/2000/600/?random)', '#c28f04', '8rem', true, 'Spotify', 'Projekt osobisty', '8.4rem', 'Officia dolore aliqua voluptate sit elit magna reprehenderit. Mollit nulla cillum ex ex duis consectetur nulla elit. Pariatur mollit est ea laboris ea pariatur sit.Officia dolore aliqua voluptate sit elit magna reprehenderit.');
const Slide3 = new Slide('calc(100% - 4rem)', '19rem', '#e84118','url(https://picsum.photos/2000/600/?random)', '#8c270e', '12rem', true, 'Forkify', 'Projekt osobisty', '8.4rem', 'Officia dolore aliqua voluptate sit elit magna reprehenderit. Mollit nulla cillum ex ex duis consectetur nulla elit. Pariatur mollit est ea laboris ea pariatur sit.Officia dolore aliqua voluptate sit elit magna reprehenderit.');
const Slide4 = new Slide('calc(100% - 8rem)', '15rem', '#9c88ff','url(https://picsum.photos/2000/600/?random)', '#4722ff', '16rem', true, 'Forkify', 'Projekt osobisty', '8.4rem', 'Officia dolore aliqua voluptate sit elit magna reprehenderit. Mollit nulla cillum ex ex duis consectetur nulla elit. Pariatur mollit est ea laboris ea pariatur sit.Officia dolore aliqua voluptate sit elit magna reprehenderit.');
const Slide5 = new Slide('calc(100% - 12rem)', '11rem', '#00a8ff','url(https://picsum.photos/2000/600/?random)', '#006599', '20rem', true, 'Forkify', 'Projekt osobisty', '8.4rem', 'Officia dolore aliqua voluptate sit elit magna reprehenderit. Mollit nulla cillum ex ex duis consectetur nulla elit. Pariatur mollit est ea laboris ea pariatur sit.Officia dolore aliqua voluptate sit elit magna reprehenderit.');

const Slides = [Slide1, Slide2, Slide3, Slide4, Slide5];
const galleryBackground = [$('.gallery'),$('.gallery__2'), $('.gallery__3'), $('.gallery__4'), $('.gallery__5')];
const buttonBack = $('.back');
const buttonNext = $('.next');

const projectText = $('.project');

const projectHeader = $('.project__name');
const projectHeaderDesc = $('.project__type');
const projectDesc = $('.project__desc');

//check if there are any more sliders, if not disable the button
const buttonCheck = () => {
  if(currentSlide>0) {buttonBack.css('display', 'block');} else {buttonBack.css('display', 'none')};
  if(currentSlide<4) {buttonNext.css('display', 'block');} else {buttonNext.css('display', 'none')};
};

const updateInfo = () => {
      //text dissapears
    projectText.fadeOut(0);
    setTimeout(() => {
      projectText.fadeIn(); //text appears after .3 second
    }, 300);

    //update text and background in the meantime
    projectText.css('left',Slides[currentSlide].leftOffset);
    projectDesc.css('background', Slides[currentSlide].textColor).html(Slides[currentSlide].headerParagraph);
    projectHeader.html(Slides[currentSlide].headerText);
    projectHeaderDesc.html(Slides[currentSlide].headerDesc);
}

var currentSlide = 0;
galleryBackground[currentSlide].css('background',Slides[currentSlide].backgroundImage);
  //BUTTON OPERATORS
buttonNext.click(() => {
  galleryBackground[currentSlide].css('background',Slides[currentSlide].backgroundColor);
  currentSlide += 1;
  if (currentSlide > 0) {
    galleryBackground[currentSlide].css('width',Slides[currentSlide].width);
    setTimeout(()=>{
      galleryBackground[currentSlide].css('background',Slides[currentSlide].backgroundImage);
    }, 500);
    
  }
  updateInfo();
  buttonCheck();
});

buttonBack.click(() => {
    galleryBackground[currentSlide].css('width',Slides[currentSlide].defaultWidth);
    galleryBackground[currentSlide].css('background',Slides[currentSlide].backgroundColor);
    currentSlide -= 1;
    setTimeout(()=>{
      galleryBackground[currentSlide].css('background',Slides[currentSlide].backgroundImage);
    }, 500);
  updateInfo();
  buttonCheck();
});

var modalPreview = $('.modal');
var modalPreviewBtn = $('.button__projectpreview');
modalPreviewBtn.click(()=>{
  modalPreview.css('display','block');
});
$(window).click((e)=>{
  
  console.log(e.target);
  if(e.target == modalPreview[0]) {
    modalPreview.css('display','none');
  }
})


/*
TODO: tekst znika natychmiast, pojawia się powoli - done
tekst auktualizuje się - done
obrazy jako tła? done
media queries
modal - mechanika działa
*/


