import {makeStyles} from "@material-ui/core"
import React, { useCallback, useState } from 'react';



const useStyles = makeStyles(() => ({
    labelLogo: {
      display: "flex",
      flexDirection: "row-reverse",
      width: "292px",
      margin: "auto",
      justifyContent: "space-between",
      color: "#9A9A9C",
      font: "inherit",
      fontSize: "1.18676em",
    },
    logoContainer: {
      margin: "auto",
      marginTop: "40px",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "column",
    },
    button: {
      display: "flex",
      flexDirection: "row",
    },
    buttonText: {
      margin: "auto",
    },
    pictureContainer: {
      height: "100px",
      background: "white",
      width: "100px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundSize: "contain",
      border: "1px solid black",
      margin: "auto",
    },
    picture: {
      maxWidth: "100%",
      maxHeight: "100%",
    },
  }));

const ImagePicker = () => {
    const [logo, setLogo] = useState("")

    const classes = useStyles()
 
 const handleCreateBase64 = useCallback(async (e) => {
          const file = e.target.files[0]//pegamos o arquivo
      const base64 = await convertToBase64(file)
      setLogo(base64)
      e.target.value = ""//isso serve para falar que se voce selecionar uma imagem e depois selecionar ela de novo ela continuara exibindo
 }, [])
 const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
       const fileReader = new FileReader();//isso te da a capcidade de ler o conteudo do arquivo do computador de alguem
            if(!file){
               alert("por favor selecione um arquivo")
            }else{
                fileReader.readAsDataURL(file)//aqui voce converte o arquivo em Base64
                fileReader.onload = () => {
                   resolve(fileReader.result)
                }
            }
             fileReader.onerror = (error) => {

                    reject(error) //se tudo esta errado da erro
             }
      })
 }
 const deleteImage = (e) => {
     e.preventDefault()
     setLogo(null)
 }
    return ( 
<div>
<div className={classes.logoContainer}>
<label className={classes.labelLogo} htmlFor="contained-button-file">
<div className={classes.buttonContainer}>
<div className={classes.button}>
<p className={classes.buttonText}>Escolha a Imagem</p>
</div>
{logo ? (
<div className={classes.button}>
<p onClick={deleteImage} className={classes.buttonText}><strong>Delete</strong></p>
</div>
) : null}
</div>
{logo ? (
<span>
<div ClassName={classes.pictureContainer}>
<img className={classes.picture} src={logo} alt="logo"/>
</div>
</span>
) : null }
</label>
</div>
<input
id="contained-button-file"
type="file"
accept="image/*, png, jpeg, jpg"
style={{display: "none"}}
name="logo"
onChange={handleCreateBase64}
/>
    </div>
);
};
export default ImagePicker;