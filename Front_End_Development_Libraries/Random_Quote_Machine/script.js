const colors = [
  '#FFBF69',
  '#2EC4B6',
  '#E71D36',
  '#FF9F1C',
  '#011627',
  '#FD9D6F',
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#C62727',
  '#F98903',
  '#4C3232',
  '#4E7376',
  '#C2BE53',
  '#574E6D',
  '#2E3837',
  '#967E76'
];

console.log(colors[1]);

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "here's the quote",
      author: "press below",
    };
    this.getQuote = this.getQuote.bind(this);
    this.update = this.update.bind(this);
  }

  async getQuote() {
    try {
      const response = await fetch(
        "https://yurippe.vercel.app/api/quotes?&random=1"
      );
      const quoteData = await response.json();
      this.setState({
        quote: quoteData[0].quote,
        author: quoteData[0].character,
      });
    } catch {
      console.error("Error fetching quote:", err);
      this.setState({
        quote: "Failed to load quote. Try again!",
        author: "Error",
      });
    }
  }

  update() {
    let timeDelay = 150;
    $(".quote-text").animate({ opacity: 0 }, timeDelay, () => {
        $(".quote-text").animate({ opacity: 1 }, timeDelay);
        $("#text").text('loading....');
      });
    $(".quote-author").animate({ opacity: 0 }, timeDelay, () => {
        $(".quote-author").animate({ opacity: 1 }, timeDelay);
        $("#author").text('.....');
      });
    this.getQuote().then(() => {
      timeDelay = 500;

      $(".quote-text").animate({ opacity: 0 }, timeDelay, () => {
        $(".quote-text").animate({ opacity: 1 }, timeDelay);
        $("#text").text(this.state.quote);
      });

      $(".quote-author").animate({ opacity: 0 }, timeDelay, () => {
        $(".quote-author").animate({ opacity: 1 }, timeDelay);
        $("#author").text(this.state.author);
      });

      $("#tweet-quote").attr(
        "href",
        "https://twitter.com/intent/tweet?hashtags=quotes&related=Morxidia&text=" +
          encodeURIComponent('"' + this.state.quote + '" ' + this.state.author)
      );

      $("#tumblr-quote").attr(
        "href",
        "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,Morxidia&caption=" +
          encodeURIComponent(this.state.author) +
          "&content=" +
          encodeURIComponent(this.state.quote) +
          "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
      );

      const colorIdx = Math.floor(Math.random() * colors.length);

      $("body").animate(
        {
          backgroundColor: colors[colorIdx],
          color: colors[colorIdx],
        },
        1000
      );
      $(".button").animate(
        {
          backgroundColor: colors[colorIdx],
        },
        1000
      );
    });
  }

  render() {
    return (
      <div id="quote-box">
        <div class="quote-text">
          <i class="bi bi-quote"></i>
          <span id="text">If I die, I can be replaced</span>
        </div>
        <div class="quote-author">
          - <span id="author">Ayanami Rei</span>
        </div>
        <div class="buttons">
          <a class="button" id="tweet-quote" target='_blank' href="https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22If%20I%20die%2C%20I%20can%20be%20replaced%22%20Ayanami%20Rei">
            <i class="bi bi-twitter-x"></i>
          </a>
          <a class="button" id="tumblr-quote" target='_blank' href="https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=Ayanami+Rei&content=If+I+die,+I+can+be+replaced&canonicalUrl=https://www.tumblr.com/buttons&shareSource=tumblr_share_button">
            <i class="bi bi-threads"></i>
          </a>
          <button class="button" id="new-quote" onClick={this.update}>
            New quote
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<QuoteBox />, document.getElementById("root"));
