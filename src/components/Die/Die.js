import './Die.css'

export default function Die({ value, isHeld, holdDie }
) {
    return (
        <div className={isHeld ? "card-green" : "card"} onClick={holdDie}>
            {/* <h2>{value}</h2> */}
            <img src={value} alt="icons" />
        </div>
    )
}