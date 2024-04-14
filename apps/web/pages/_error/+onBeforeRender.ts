export async function onBeforeRender() {
  return {
    pageContext: {
      kind: "error",
    },
  };
}
