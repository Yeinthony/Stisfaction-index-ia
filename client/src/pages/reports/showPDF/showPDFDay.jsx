import { useEffect, useState } from "react";

//Dependencies
import {Document, Image, PDFViewer, Page, Text, View} from "@react-pdf/renderer";

//Others
import { getExpressionsForDay } from "../../../api/expressions.api";
import { getGendersForDay } from "../../../api/genders.api";
import { getAgesForDay } from "../../../api/ages.api";
import { averagePorcentageExpressions, averagePorcentageGenders, averagePorcentageAges } from "../../../helpers/AveragePorcentange";
import logo from "../../../assets/img/logos/expressionsIA2.png";
import { Unfold } from "../../../helpers/Unfold";
import { Navbar } from "../../../components/Navbar";
import { Sidebar } from "../../../components/Sidebar";


export function ShowPDFDay() {

    const [expressions, setExpressions] = useState({});
    const [genders, setGenders] = useState({});
    const [ages, setAges] = useState({});

    const name = `${localStorage.getItem('name')} ${localStorage.getItem('last_name')}`;
    const today = new Date();
    const token = sessionStorage.getItem('token');
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();


    useEffect(() => {

        const expressionsToday = async() =>{
            const res = await getExpressionsForDay(token, day, month, year);
            setExpressions(averagePorcentageExpressions(res.data));
        }

        const gendersToday = async() =>{
            const res = await getGendersForDay(token, day, month, year);
            setGenders(averagePorcentageGenders(res.data));
        }

        const agesToday = async() =>{
            const res = await getAgesForDay(token, day, month, year);
            setAges(averagePorcentageAges(res.data));
        }

        expressionsToday();
        gendersToday();
        agesToday();

    }, []);
    
    return (
        
        <div onClick={Unfold}>
            <Navbar/>
            <Sidebar/>
            {expressions && genders && ages ?
                <PDFViewer style={{
                    width:"82%", 
                    height:"92.3vh", 
                    marginLeft:"18%",
                    marginTop:"3rem"
                }}>
                    <Document>
                        <Page size="A4">
                            <View style={{paddingTop:"75px", paddingLeft:"75px", paddingBottom:"50px", paddingRight:"50px"}}>
                                <View>
                                    <View style={{display: "flex"}}>
                                        <View style={{marginTop:"5px"}}>
                                            <Text style={{fontSize:"13px"}}>E X P R E S S I O N S  .I A</Text>
                                            <Text style={{fontSize:"33px", fontWeight:"extrabold", marginTop:"5px"}}>REPORTE DIARIO</Text>
                                        </View>
                                        <Image style={{ width:"70px", position:"absolute", right:"0" }} src={logo} alt="user photo" id="img-user"/>
                                    </View>
                                    <View style={{marginTop:"55px", position:"relative"}}>
                                        <View style={{backgroundColor:"#ededed", padding:"8px", position:"relative", width:"250px"}}>
                                            <Text style={{width:"90px", fontSize:"13px"}}>NOMBRE:</Text>
                                            <Text style={{width:"160px", fontSize:"13px", position:"absolute", right:"0", top:"8px", textTransform:"uppercase"}}>{name}</Text>
                                        </View>
                                        <View style={{backgroundColor:"#ededed", padding:"9px", position:"absolute", width:"170px", right:"0"}}>
                                            <Text style={{width:"70px", fontSize:"13px"}}>FECHA:</Text>
                                            <Text style={{width:"100px", fontSize:"13px", position:"absolute", right:"0", top:"8px"}}>{`${today.getDate()}/${[today.getMonth()+1]}/${today.getFullYear()}`}</Text>
                                        </View>
                                    </View>
                                    <View style={{marginTop:"130px"}}>
                                        <View style={{left:"0", right:"0"}}>
                                            <Text style={{textAlign:"center", fontSize:"22"}}>DETALLES DE LAS DETECCIONES</Text>
                                        </View>
        
                                        <View style={{marginTop:"50px", position:"relative"}}>
                                            <View style={{backgroundColor:"#ededed", width:"160px"}}>
                                                <View style={{position:"relative"}}>
                                                    <View style={{position: "relative", backgroundColor:"#5F9EC1", padding:"10px",}}>
                                                        <View>
                                                            <Text style={{fontSize:"13px"}}>Expresión</Text>
                                                        </View>
                                                        <View style={{position:"absolute", top:"10", right:"10"}}>
                                                            <Text style={{fontSize:"13px"}}>Porcentaje</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{padding:"10px"}}>
                                                        <View style={{position:"relative"}}>
                                                            <View>
                                                                <Text style={{fontSize:"12px"}}>Enojo</Text>
                                                            </View>
                                                            <View style={{position:"absolute", left:"80"}}>
                                                                <Text style={{fontSize:"12px"}}>{expressions.angry} %</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{position:"relative", marginTop:"10px"}}>
                                                            <View>
                                                                <Text style={{fontSize:"12px"}}>Disgusto</Text>
                                                            </View>
                                                            <View style={{position:"absolute", left:"80"}}>
                                                                <Text style={{fontSize:"12px"}}>{expressions.disgust} %</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{position:"relative", marginTop:"10px"}}>
                                                            <View>
                                                                <Text style={{fontSize:"12px"}}>Miedo</Text>
                                                            </View>
                                                            <View style={{position:"absolute", left:"80"}}>
                                                                <Text style={{fontSize:"12px"}}>{expressions.fear} %</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{position:"relative", marginTop:"10px"}}>
                                                            <View>
                                                                <Text style={{fontSize:"12px"}}>Felicidad</Text>
                                                            </View>
                                                            <View style={{position:"absolute", left:"80"}}>
                                                                <Text style={{fontSize:"12px"}}>{expressions.happy} %</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{position:"relative", marginTop:"10px"}}>
                                                            <View>
                                                                <Text style={{fontSize:"12px"}}>Neutral</Text>
                                                            </View>
                                                            <View style={{position:"absolute", left:"80"}}>
                                                                <Text style={{fontSize:"12px"}}>{expressions.neutral} %</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{position:"relative", marginTop:"10px"}}>
                                                            <View>
                                                                <Text style={{fontSize:"12px"}}>Tristeza</Text>
                                                            </View>
                                                            <View style={{position:"absolute", left:"80"}}>
                                                                <Text style={{fontSize:"12px"}}>{expressions.sad} %</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{position:"relative", marginTop:"10px"}}>
                                                            <View>
                                                                <Text style={{fontSize:"12px"}}>Sorpresa</Text>
                                                            </View>
                                                            <View style={{position:"absolute", left:"80"}}>
                                                                <Text style={{fontSize:"12px"}}>{expressions.surprise} %</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                    
                                            <View style={{backgroundColor:"#ededed", width:"135px", position:"absolute", left:"170px"}}>
                                                <View style={{position:"relative"}}>
                                                    <View style={{position: "relative", backgroundColor:"#5F9EC1", padding:"10px"}}>
                                                        <View>
                                                            <Text style={{fontSize:"13px"}}>Edad</Text>
                                                        </View>
                                                        <View style={{position:"absolute", top:"10", right:"10"}}>
                                                            <Text style={{fontSize:"13px"}}>Porcentaje</Text>
                                                        </View>
                                                    </View>
                                                    <View  style={{padding:"10px"}}>
                                                        <View style={{position:"relative"}}>
                                                            <View>
                                                                <Text style={{fontSize:"12px"}}>6-11</Text>
                                                            </View>
                                                            <View style={{position:"absolute", left:"55"}}>
                                                                <Text style={{fontSize:"12px"}}>{ages.six_to_eleven} %</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{position:"relative", marginTop:"10px"}}>
                                                            <View>
                                                                <Text style={{fontSize:"12px"}}>12-18</Text>
                                                            </View>
                                                            <View style={{position:"absolute", left:"55"}}>
                                                                <Text style={{fontSize:"12px"}}>{ages.twelve_to_eighteen} %</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{position:"relative", marginTop:"10px"}}>
                                                            <View>
                                                                <Text style={{fontSize:"12px"}}>19-26</Text>
                                                            </View>
                                                            <View style={{position:"absolute", left:"55"}}>
                                                                <Text style={{fontSize:"12px"}}>{ages.nineteen_to_twentysix} %</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{position:"relative", marginTop:"10px"}}>
                                                            <View>
                                                                <Text style={{fontSize:"12px"}}>27-59</Text>
                                                            </View>
                                                            <View style={{position:"absolute", left:"55"}}>
                                                                <Text style={{fontSize:"12px"}}>{ages.twentyseveven_to_fiftynine} %</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{position:"relative", marginTop:"10px"}}>
                                                            <View>
                                                                <Text style={{fontSize:"12px"}}>60-80</Text>
                                                            </View>
                                                            <View style={{position:"absolute", left:"55"}}>
                                                                <Text style={{fontSize:"12px"}}>{ages.sixty_to_eighty} %</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={{backgroundColor:"#ededed", width:"155px", position:"absolute", right:"0"}}>
                                                <View style={{position:"relative"}}>
                                                    <View style={{position: "relative", backgroundColor:"#5F9EC1", padding:"10px"}}>
                                                        <View>
                                                            <Text style={{fontSize:"13px"}}>Genero</Text>
                                                        </View>
                                                        <View style={{position:"absolute", top:"10", right:"10"}}>
                                                            <Text style={{fontSize:"13px"}}>Porcentaje</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{padding:"10px"}}>
                                                        <View style={{position:"relative"}}>
                                                            <View>
                                                                <Text style={{fontSize:"12px"}}>Masculino</Text>
                                                            </View>
                                                            <View style={{position:"absolute", left:"75"}}>
                                                                <Text style={{fontSize:"12px"}}>{genders.male} %</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{position:"relative", marginTop:"10px"}}>
                                                            <View>
                                                                <Text style={{fontSize:"12px"}}>Femenino</Text>
                                                            </View>
                                                            <View style={{position:"absolute", left:"75"}}>
                                                                <Text style={{fontSize:"12px"}}>{genders.female} %</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>     
                            </View>
                        </Page>  
                    </Document>
                </PDFViewer>
                : null
            }
        </div>

    )
}