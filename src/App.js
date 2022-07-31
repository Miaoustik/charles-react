import { Routes, Route } from "react-router-dom";
import "./App.css";
import Galerie from "./components/Galerie";
import Header from "./components/Header";
import Home from "./components/Home";
import styled from "styled-components/macro";
import Tarifs from "./components/Tarifs";
import Contact from "./components/Contact";
import instance from "./helpers/instance";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";


function App() {
  const [listImg, setListImg] = useState([]);
  const [catState, setCatState] = useState({});
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [img, setImage] = useState("");
  const [tarif, setTarif] = useState("");
  const [tarifImg, setTarifImg] = useState("");
  const [contactState, setContactState] = useState({
    text: "",
    img: "",
  });
  const [links, setLinks] = useState({
    facebook: "",
    insta: "",
  });

  useEffect(() => {
    if (!loaded) {
      const getData = async () => {
        await instance
          .get("/posts")
          .then((res) => {
            const posts = res.data.posts;
            let contents = [];
            posts.forEach((post) => {
              if (
                post.title !== "Home page image" &&
                post.title !== "Tarifs et prestations" &&
                post.title !== "Contact text et image" &&
                post.title !== "Social links"
              ) {
                const imagesUrl = [];
                const content = post.content.split("</figure>");
                const contentFiltred = content.filter((e) => e !== "\n");
                contentFiltred.forEach((content) => {
                  const index = content.indexOf("src=");
                  imagesUrl.push(
                    content.substring(
                      index + 5,
                      content.indexOf(" ", index) - 1
                    )
                  );
                });
                contents.push({ categories: post.categories, imagesUrl });
              }
            });
            setListImg(contents);

            const resFiltred = res.data.posts.filter(
              (post) => post.title === "Home page image"
            )[0].content;
            const srcIndex = resFiltred.indexOf("src=") + 5;

            setImage(
              resFiltred.substring(
                srcIndex,
                resFiltred.indexOf(" ", srcIndex) - 1
              )
            );

            const resTarif = res.data.posts
              .filter((post) => post.title === "Tarifs et prestations")[0]
              .content.split("\n")
              .filter((e) => e !== "");

            let tarifs = [];

            resTarif.forEach((e) => {
              tarifs.push(e.substring(3, e.length - 4));
            });

            let finalTarif = [];

            for (let i = 0; i < tarifs.length; i = i + 2) {
              finalTarif.push([tarifs[i], tarifs[i + 1]]);
            }

            const tarifTmp = finalTarif.slice(finalTarif.length - 1)[0][0];
            finalTarif.pop();
            setTarif(finalTarif);

            const posTarif = tarifTmp.indexOf('src="');

            const tarifImg2 = tarifTmp.substring(
              posTarif + 5,
              tarifTmp.indexOf('" ', posTarif)
            );

            setTarifImg(tarifImg2);

            const resContact = res.data.posts
              .filter((post) => post.title === "Contact text et image")[0]
              .content.split("\n")
              .filter((e) => e !== "");

            const contactText = resContact[0].substring(
              3,
              resContact[0].length - 4
            );

            const contactPos = resContact[1].indexOf('src="');
            const contactImg = resContact[1].substring(
              contactPos + 5,
              resContact[1].indexOf('" ', contactPos)
            );

            setContactState({
              text: contactText,
              img: contactImg,
            });

            const resSocial = res.data.posts
              .filter((post) => post.title === "Social links")[0]
              .content.split("\n")
              .filter((e) => e !== "");

            const posFb = resSocial[0].indexOf("href");
            const facebook = resSocial[0].substring(
              posFb + 6,
              resSocial[0].indexOf(" ", posFb) - 1
            );

            const posInsta = resSocial[1].indexOf("href");
            const insta = resSocial[1].substring(
              posInsta + 6,
              resSocial[1].indexOf(" ", posInsta) - 1
            );

            setLinks({
              facebook,
              insta,
            });
          })

          .catch((err) => console.log(err.message));
        await instance
          .get("/categories")
          .then((res) => {
            let cat = [];

            res.data.categories.forEach((el) => {
              if (el.name !== "Non classé") {
                cat.push(el.name);
              }
            });
            let map = {};
            cat.map((e) => (map[e] = false));

            setCatState(map);
            setCategories(cat);
          })
          .catch((err) => console.log(err.message));
      };
      getData();
    }
  }, [loaded]);

  useEffect(() => {
    if (
      tarif !== "" &&
      categories !== [] &&
      loaded === false &&
      listImg !== []
    ) {
      setLoaded(true);
    }
  }, [tarif, categories, listImg, loaded]);

  return (
    <>
      {loaded ? (
        <AppStyled>
          <Header links={links} />
          <Routes>
            <Route index element={<Home loaded={loaded} img={img} />} />
            <Route
              path="/galerie"
              element={
                <Galerie
                  listImg={listImg}
                  catState={catState}
                  categories={categories}
                  setCatState={setCatState}
                  loaded={loaded}
                />
              }
            />
            <Route
              path="/tarifs"
              element={
                <Tarifs tarif={tarif} loaded={loaded} tarifImg={tarifImg} />
              }
            />
            <Route
              path="/contact"
              element={<Contact loaded={loaded} contactState={contactState} />}
            />
          </Routes>
          
        </AppStyled>
      ) : (
        <Loading />
      )}
    </>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  width: 100vw;

  scrollbar-width: 0;
`;

export default App;
