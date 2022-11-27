 if (document.getElementById('post-cover')) {
  } else {
    this.r = Math.floor(Math.random()*80+20);
    this.g = Math.floor(Math.random()*200+40);
    this.b = Math.floor(Math.random()*200+40);
    this.cs = 'rgba('+ this.r +','+ this.g +','+ this.b +',0.95)';
    this.tm = 'rgba('+ this.r +','+ this.g +','+ this.b +',0.2)';
    document.styleSheets[0].addRule(":root[data-theme=light]", "--heo-lighttext:" + this.cs + "!important")
    document.styleSheets[0].addRule(":root[data-theme=light] ", "--heo-theme:" + this.cs + "!important")
    document.styleSheets[0].addRule(":root[data-theme=dark]", "--heo-theme:" + this.cs + "!important")
    document.styleSheets[0].addRule(":root[data-theme=light] ", "--heo-zhuti:" + this.tm + "!important")
    document.styleSheets[0].addRule(":root[data-theme=dark]", "--heo-zhuti:" + this.tm + "!important")
    this.r2 = Math.floor(Math.random()*255+80);
    this.g2 = Math.floor(Math.random()*255+80);
    this.b2 = Math.floor(Math.random()*255+80);
    this.cs2 = 'rgba('+ this.r2 +','+ this.g2 +','+ this.b2 +',0.95)';
    document.styleSheets[0].addRule(":root[data-theme=dark]", "--heo-lighttext:" + this.cs2 + "!important")
  }

