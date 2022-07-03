import axios from "axios";
import { useState, useEffect } from "react";
import Nav from "./nav";
import Header from './header'

function Review(){
    const [reviewStar, setReviewStar] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [tourlist, setTourlist] = useState(null);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        axios.get('api/tourlist')
            .then(response => {
                return response
            }).then(data => {
                setTourlist(data.data);
            })
    }, [])

    setTimeout(()=>{    
        document.querySelector('select').innerHTML = "";           
            for(let i=0;i<12;i++){
                document.querySelector('select').innerHTML += `<option value="${tourlist[i].tourNum}">${tourlist[i].tourName}</option>`
            }
    }, 200)

    const postReview = () => {
        if(selected === null){
            alert('관광지를 선택해주세요.')
        }
        else if(reviewStar === null){
            alert('별점을 선택해주세요.');
        }
        else if(reviewText === ""){
            alert('리뷰 내용을 적어주세요.')
        }
        else{
            const reviewData = {
                tourNum: selected,
                reviewStar: reviewStar,
                reviewText: reviewText
            }
            console.log(reviewData);
            axios.post('/api/postReview', reviewData)
            .then((response)=>{
                return response;
            }).then(data => {
                console.log(data.data);
            }).catch((error)=>{
                console.log(error);
            })
        }
    }

    return(
        <div>
            <Header/>
            <Nav/>
            <div id="review">
                <h1 id="rvTitle">리뷰 작성</h1>
                <div className="rvBox">
                    <div>
                        <select className="rvTourSelect" onChange={(e)=>{ setSelected(e.target.value)}}>
                            <option value={"null"}>관광지 선택</option>
                        </select>
                        <input className="rvInput" type="number" onChange={(e)=>{ setReviewStar(e.target.value) }} min="1" max="5" />
                    </div>
                    <textarea className="rvText" placeholder="여기에 리뷰를 작성해주세요." onChange={(e)=>{ setReviewText(e.target.value) }}/>
                    <button className="rvButton" onClick={postReview}>리뷰 남기기</button> 
                </div>
            </div>
        </div>
    );
}
export default Review;