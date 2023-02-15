function TooltipContaint(props) {
    return (
      <div
        style={{
          border: "#bbb 1.5px solid",
        }}
      >
        <p
          style={{
            margin: "0 0",
            padding: "3px 7.5px",
            backgroundColor: "white",
          }}
        >
          {props.props.payload &&
            props.props.payload[0] != null &&
            props.props.payload[0].payload.Date}
        </p>
        <p
          style={{
            margin: "0 0",
            padding: "3px 7.5px",
            backgroundColor: "white",
            color: "#007AFF",
          }}
        >
          Price ₹
          {props.props.payload &&
            props.props.payload[0] != null &&
            Number(props.props.payload[0].payload.price).toFixed(2)}
        </p>
      </div>
    );
  }
  
  export default TooltipContaint;
  