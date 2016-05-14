export default class ContentMiddle extends React.Component {
  render(){
    return (
      <div className="track">
        <div className="track__art">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/whenDarkOut.jpg" alt="When It's Dark Out" />
        </div>
        <div className="track__number">1</div>
        <div className="track__added">
          <i className="ion-checkmark-round added" />
        </div>
        <div className="track__title">Me, Myself &amp; I</div>
        <div className="track__explicit">
          <span className="label">Explicit</span>
        </div>
        <div className="track__plays">147,544,165</div>
      </div>
    );
  }
}
