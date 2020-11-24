module.exports.Bot = class Bot {
  constructor(){
    this.activeChannels = new Map();
  }

  activateChannel (channelID, callback){
    this.activeChannels.set(channelID, callback);
  }

  notify (channelID, timestamp){
    
  }
}