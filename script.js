// Select all feature list items and the image element
const featureLists = document.querySelectorAll(".feature-list-track");
const featureImage = document.querySelector(".show-feature-image img"); // Image to change dynamically
const featureContentBoxes = document.querySelectorAll(
  ".content-box-features-list"
); // Content boxes related to features

// Define images for each feature (ensure these are in order)
const featureImages = [
  "./img/EmailDiscovery.png",
  "./img/imageLinkidIn.png",
  "./img/personalization.png",
  "./img/UnlimitedAutomation.png",
];

// Preload all feature images
function preloadImages(imageUrls) {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url; // This starts the download immediately
  });
}

// Preload images on page load
window.addEventListener("load", () => {
  preloadImages(featureImages);
});

// Intersection Observer options
let screenWidth = window.innerWidth;
console.log(screenWidth);
const options = {
  root: null, // Observe the viewport
  rootMargin: `${
    screenWidth >= 520 ? "-20% 0px -80% 0px" : "-40% 0px -60% 0px"
  }`, // Trigger when the section reaches 40% of the screen
  threshold: 0, // Trigger as soon as the element enters/exits the rootMargin
};

// Create an Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Get the index of the intersecting feature list item
      const index = Array.from(featureLists).indexOf(entry.target);

      // Set the active image and style for the feature list item
      featureImage.src = featureImages[index];

      // Show the corresponding content box using data-id and hide others
      const selectedId = entry.target.getAttribute("data-id");
      featureContentBoxes.forEach((contentBox) => {
        if (contentBox.id === selectedId) {
          contentBox.style.display = "flex"; // Show the corresponding content box
        } else {
          contentBox.style.display = "none"; // Hide other content boxes
        }
      });

      // Update opacity of the list items
      featureLists.forEach((list, idx) => {
        list.style.opacity =
          idx === index ? "var(--active_opacity)" : "var(--default_opacity)";
        list.style.color = idx === index ? "#fca739" : "#0080ff";

        if (idx === index) {
          list.classList.add("active");
        } else {
          list.classList.remove("active");
        }
      });
    } else if (entry.boundingClientRect.top > 0) {
      // Handle reverse scrolling to activate items
      const index = Array.from(featureLists).indexOf(entry.target);

      // Update opacity of the list items
      featureLists.forEach((list, idx) => {
        list.style.opacity =
          idx === index ? "var(--active_opacity)" : "var(--default_opacity)";
        list.style.color = idx === index ? "#fca739" : "#0080ff";

        if (idx === index) {
          list.classList.add("active");
        } else {
          list.classList.remove("active");
        }
      });

      // Set the image source for the active list item
      featureImage.src = featureImages[index];

      // Show the corresponding content box using data-id and hide others
      const selectedId = entry.target.getAttribute("data-id");
      featureContentBoxes.forEach((contentBox) => {
        if (contentBox.id === selectedId) {
          contentBox.style.display = "flex"; // Show the corresponding content box
        } else {
          contentBox.style.display = "none"; // Hide other content boxes
        }
      });
    }
  });
}, options);

// Observe each feature list item
featureLists.forEach((item) => observer.observe(item));
