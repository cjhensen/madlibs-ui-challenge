require('normalize.css/normalize.css');
require('styles/App.css');

var React = require('react');

var AppComponent = React.createClass({
  getInitialState: function() {
    var inputs = {};
    var regexp = /%&(.*?)&%/gi;
    var result;
    while (result = regexp.exec(this.props.text)) {
      inputs[result[1]] = '';
    }
    return {
      inputs: inputs,
      submitted: false
    };
  },
  getDefaultProps: function() {
    return {
      text: "Number One\nFreedom of religion, speech, and press,\nPlus you can assemble in crowds and %&verb&%.\n\nNumber Two\nRight to bear arms and cannons,\nI bet the Minutemen didn't know about handguns.\n\nNumber Three\nWhen soldiers gets sleepy,\nYou don't have to let them sleep up on your %&noun&%.\n\nNumber Four\nNo one can search and seize. It protects me, \nUnless people have a warrant to arrest me.\n\nNumber Five\nIf you arrest me, respect me.\nSorry, Alex, there's no Double Jeopardy.\nWhat'd you do after school?\n\"I plead the fifth.\"\nWhat'd you do after that, dude?\n\"I plead the fifth.\"\nI don't have to incriminate myself or risk my health,\nWhenver I'm in trouble, I just plead the fifth.\n\nNumber Six\nYou must process me %&word ending in -ly&%.\n\nNumber Seven\nIn front of my peers on the jury.\n\nNumber Eight\nYou can't use cruel or unusual punishment.\nYou can't make me drink %&liquid&% for the fun of it.\n\nNumber Nine\nThe people get more than these rights.\n\nNumber Ten\nStates can make other laws, and they just might.\n\nThis is the Bill of Rights."
    };
  },
  onSubmit: function(event) {
    event.preventDefault()
    this.setState({
      submittedText: this.props.text.replace(
        /%&(.*?)&%/gi,
        (match, p1) => `<span class="user-inputted">${this.state.inputs[p1]}</span>`
      ).replace(
        /\n/gi,
        '<br />'
      )
    });
  },
  render: function() {
    return (
      <div className="index">
        {
          this.state.submittedText
          ? (
              <div dangerouslySetInnerHTML={{__html: this.state.submittedText}} />
            )
          : (
              <form onSubmit={this.onSubmit}>
                {
                  Object.keys(this.state.inputs).map(
                    inputName => (
                      <div>
                        <label>{inputName}</label>
                        <input
                          type='text'
                          key={inputName}
                          name={inputName}
                          value={this.state.inputs[inputName]}
                          onChange={
                            e => {
                              this.state.inputs[inputName] = e.target.value;
                              this.setState({inputs: this.state.inputs});
                            }
                          }
                        />
                      </div>
                    )
                  )
                }
                <button type="submit">interpolate!</button>
              </form>
            )
        }
      </div>
    );
  }
})

module.exports = AppComponent;
