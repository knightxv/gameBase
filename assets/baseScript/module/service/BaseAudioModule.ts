import BaseServiceModule from '../BaseServiceModule';
export default class BaseAudioModule extends BaseServiceModule {
    public audioEngine = cc.audioEngine;
    private baseAudioPath = 'resources/'
    loadAudio(audioPath): Promise<cc.AudioClip | null> {
        return new Promise(resolve => {
            cc.loader.load(cc.url.raw(this.baseAudioPath + audioPath), (err, audioClip) => {
                if (err) {
                    this.LogError(`${audioPath}:底下的音源不存在`);
                    resolve(null);
                    return;
                }
                resolve(audioClip)
            });
        })
    }
    stopAll() {
        cc.audioEngine.stopAll();
    }
    private audioArr: number[] = [];
    playAudio(audioClip, isLoop = false, mute?): number {
        let playMute = mute || this.defaultMute;
        const audioId = cc.audioEngine.play(audioClip, isLoop, playMute);
        if (!mute) {
            this.audioArr.push(audioId);
        }
        return audioId;
    }
    private defaultMute = 1;
    get mute(): number {
        return this.defaultMute;
    }
    set mute(muteVal: number) {
        this.setMuteAll(muteVal);
    }
    setMuteAll(muteVal) {
        this.audioArr.forEach(audioId => {
            this.setMute(audioId, muteVal);
        });
    }
    setMute(audioId: number, mute: number) {
        cc.audioEngine.setVolume(audioId, mute);
    }
}
