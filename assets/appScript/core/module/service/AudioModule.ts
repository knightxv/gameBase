import BaseAudioModule from '../../../../baseScript/module/service/BaseAudioModule';

enum AudioSource {
    bg = 'ui/common/audio/bg.mp3',
};

export default class AudioModule extends BaseAudioModule {
    private bgAudio: number = null;
    private bgMute = 1;
    playBg() {
        if (this.bgAudio) {
            this.audioEngine.resume(this.bgAudio)
            return;
        }
        this.loadAudio(AudioSource.bg).then(audioClip => {
            this.bgAudio = this.playAudio(audioClip, true, this.bgMute);
        });
    }
    stopBg() {
        if (this.bgAudio) {
            this.audioEngine.stop(this.bgAudio);
        }
    }
    pauseBg() {
        if (this.bgAudio) {
            this.audioEngine.pause(this.bgAudio)
        }
    }
    setBgMute(mute: number) {
        this.setMute(this.bgAudio, mute);
    }
    
}
