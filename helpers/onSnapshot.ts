import firebase from "firebase/compat";

export const onSnapshot = (ref, callback, options) => {
  ref.onSnapshot((snapshot) => {
    let items = snapshot.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    items = options && options.sort ? items.sort(options.sort) : items;
    callback(items);
  });
};

export const addDoc = (ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>, name: string, { ...data }) => {
  ref.doc(name)
    .set(data)
    .then(() => {
      console.log("add new item");
  });
};

export const removeDoc = (ref, id) => {
  ref.doc(id)
    .delete()
    .then(() => {
      console.log(`removed item: ${id}`);
    });
};

export const updateDoc = (ref, name: string, {...data}) => {
  ref.doc(name)
    .set(data)
    .then(() => {
      console.log(`updated item: ${name}`)
    })
};
