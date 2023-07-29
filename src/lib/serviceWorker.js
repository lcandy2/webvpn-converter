export default function serviceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').then(
        function (registration) {
          console.log(
            'Service Worker registration successful with scope: ',
            registration.scope
          );
        },
        function (err) {
          console.log('Service Worker registration failed: ', err);
        }
      );
    });
  }
}
