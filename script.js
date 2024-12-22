// Select all feature list items and the image element
const featureLists = document.querySelectorAll(".feature-list-track");
const featureImage = document.querySelector(".show-feature-image img");

// Define images for each feature
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
const options = {
  root: null, // Observe the viewport
  rootMargin: "-20% 0px -80% 0px", // Trigger when the section reaches 40% of the screen
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
      featureLists.forEach((list, idx) => {
        list.style.opacity =
          idx === index ? "var(--active_opacity)" : "var(--default_opacity)";
      });
    } else if (entry.boundingClientRect.top > 0) {
      // Handle reverse scrolling to activate items
      const index = Array.from(featureLists).indexOf(entry.target);

      featureLists.forEach((list, idx) => {
        list.style.opacity =
          idx === index ? "var(--active_opacity)" : "var(--default_opacity)";
      });
      featureImage.src = featureImages[index];
    }
  });
}, options);

// Observe each feature list item
featureLists.forEach((item) => observer.observe(item));
