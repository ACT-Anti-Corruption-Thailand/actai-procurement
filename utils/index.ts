export const scrollToTop = () => {
  if (window) window.scrollTo(0, 0);
};

export const highlight = (title: string) => {
  const route = useRoute();
  var innerHTML = title;
  const urlParams = route.query.search;
  var index = innerHTML.toLowerCase().indexOf(String(urlParams));

  if (index >= 0 && urlParams) {
    innerHTML =
      innerHTML.substring(0, index) +
      "<span class='text-[#74060A]'>" +
      innerHTML.substring(index, index + urlParams.length) +
      "</span>" +
      innerHTML.substring(index + urlParams.length);
  }
  return innerHTML;
};
