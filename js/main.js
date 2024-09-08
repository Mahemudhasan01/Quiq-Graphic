$(document).ready(function() {
    const phrases = ["Manu Design", "Logo Design", "Branding", "Printing"]; // Add your text phrases here
    let phraseIndex = 0;
    let charIndex = 0;
    const typingSpeed = 100; // Typing speed in milliseconds
    const deleteSpeed = 50;  // Deleting speed in milliseconds
    const pauseBetweenPhrases = 2000; // Pause time between phrases

    const typewriter = $('.typewriter');

    function typeText() {
        const currentPhrase = phrases[phraseIndex];
        if (charIndex < currentPhrase.length) {
            typewriter.text(typewriter.text() + currentPhrase[charIndex]);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        } else {
            setTimeout(deleteText, pauseBetweenPhrases); // Start deleting after a pause
        }
    }

    function deleteText() {
        if (charIndex > 0) {
            typewriter.text(typewriter.text().slice(0, -1)); // Remove last character
            charIndex--;
            setTimeout(deleteText, deleteSpeed);
        } else {
            phraseIndex = (phraseIndex + 1) % phrases.length; // Move to next phrase
            setTimeout(typeText, typingSpeed);
        }
    }

    // Start the typing effect
    typeText();

    //For dynamic stastics
    let counted = false; // Track if the counter has already run

    $(window).on('scroll', function() {
        // Check if user has scrolled to the section
        const statsSection = $('.statistics');
        const sectionOffset = statsSection.offset().top - window.innerHeight;

        if (!counted && $(window).scrollTop() > sectionOffset) {
            counted = true; // Ensure this only runs once

            // Animate the counters
            $('.counter').each(function() {
                const $this = $(this);
                const countTo = $this.attr('data-count');

                $({ countNum: $this.text() }).animate(
                    { countNum: countTo },
                    {
                        duration: 2000, // Animation duration (2 seconds)
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum); // Ensure final number
                        }
                    }
                );
            });
        }
    });
});