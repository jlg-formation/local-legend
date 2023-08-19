export const scrollToSegment = (id: number) => {
  const parent = document.querySelector(".content") as HTMLElement;
  console.log("parent: ", parent);
  const elt = document.querySelector("#segment-" + id) as HTMLElement;
  console.log("elt: ", elt);
  console.log(
    "elt.getBoundingClientRect().top: ",
    elt.getBoundingClientRect().top
  );
  parent.scrollBy({
    top: elt.getBoundingClientRect().top - 48,
    behavior: "smooth",
  });
};
