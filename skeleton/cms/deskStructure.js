import S from "@sanity/desk-tool/structure-builder";

const hiddenDocTypes = listItem => !["site-config"].includes(listItem.getId());

export default () =>
  S.list()
    .title("Site")
    .items([
      S.listItem()
        .title("Site config")
        .child(
          S.editor()
            .id("config")
            .schemaType("site-config")
            .documentId("global-config")
        ),
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ]);
