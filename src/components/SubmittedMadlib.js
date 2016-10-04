var React = require('react');

var SubmittedMadlib = React.createClass({

  render: function() {
    var filledInMadlib = this.getFilledInMadlib();

    return (
      // this is what creates the displayed finished
      // madlib
      <div className='submitted-madlib-container'>
        <h2>Your madlib:</h2>
        <button
        	className='back-button'
          onClick={this.props.reset}
        >
          Go back
        </button>
        <div className='submitted-madlib'>
          {filledInMadlib}
        </div>
      </div>
    );
  },

  getFilledInMadlib: function() {

    var blankRegexp = /%&(.*?)&%/gi;
    return this.props.text.split('\n').map(
      (line, i) => (
        <span
          // don't worry about this `key` attribute
          key={`madlibline${i}`}
          className='madlib-line'
        >
          {
            line.split(blankRegexp).map(
              chunk => (
                <span
                  // don't worry about this `key` attribute
                  key={`${chunk}${i}`}
                  className={
                    this.props.value[chunk]
                    ? 'user-submitted-value'
                    : ''
                  }
                >
                  {
                    this.props.value[chunk]
                    ? this.props.value[chunk]
                    : chunk
                  }
                </span>
              )
            )
          }
        </span>
      )
    )
  }
});

module.exports = SubmittedMadlib;
