/**
 * EXPLIQUER LE FONCTIONNEMENT DE LA FONCTION receptionDuNumeroDeCommande()
 *
 *
 */
function receptionDuNumeroDeCommande() {
  const orderId = document.querySelector("#orderId");
  orderId.innerHTML = localStorage.getItem("orderId");
  localStorage.clear();
}
receptionDuNumeroDeCommande();
