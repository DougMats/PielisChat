import React from 'react'
import { View, Image, Text, Slider, TouchableOpacity, Platform, Alert} from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { colorAlfa, colorBeta, colorDseta, colorGamma } from "../Colors";
import Toast from 'react-native-simple-toast';
import Sound from 'react-native-sound';

const img_speaker =    {uri: 'data:image/png;base64,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' }; // ('./resources/ui_speaker.png');
const img_pause =    {uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAREBAREBAREBEREQ8OEhERERYRFhYRFxgXFxgSFhYZHiojGSEoHBYWJDMjKistMDAwGCE2OzYvOiovMC0BCwsLDw4PHBERGy8nISgvMC8xLS0vOi8tLy8vNC8vLy8vLS8vLzIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAgMFBgcBBAj/xABGEAABAwIBBggJCgYCAwAAAAABAAIDBBEFBhIhMUFRBxM0YXOBobIUIiQyQlJxkcEVI1RidIKSscLwFjNjcqLRk/ElU9L/xAAaAQACAwEBAAAAAAAAAAAAAAAABQECBAMG/8QAMBEAAgECAggFBAMBAQAAAAAAAAECAwQRcRIhMTIzQVGBE2GhwdEikbHwI0JSFRT/2gAMAwEAAhEDEQA/ANxQhCABCEIAEIQgAQhR2L4zT0rM+olbGNgJu5x3NaNJ6lKTbwRDaSxZIpqeZrGlz3NY0aS5xDQBzkrMMX4TJpXGOghIvoD3tz3nnDBq7VEDJrEaxwkrJ3N22ldnkexg8VvZ7FqjZy2zeH5Mk7yOyC0vx9zQcRy+w6G44/jXDZEC8fi1dqrtZwss1Q0rnc8jw3sF1HjJrDaYA1EwcddpJA2/sYNJSv4hwuDRDEHEaiyG3+T7Fd421JbE2cJ3NV80ht/CZXv/AJVNGPYx8n5WXW5c40dVMD7KWU/Fcky/YNDIH9bwOwBed2X79kDet5XXwI8qaOXjy51GP/x9iw0uphbnp5R23TsPCpUt0S0sZ32c5h9xC8zMv3bYB1PXobl1Tv0SwPt92TsKHQjzponx58qnoTVFwqUrv5sMsXO20g7FZsLyqoakgRVMZedUbjmPvuDXWJ6lQDWYPP57Y43H1mGLtHi9qYqchqeVudTTWB0i5ErPeFxlbUn1idY3VXyfobChYpDPjGG+a58sLdlzPHb2HxmdgVryf4TKeWzKppp36s7S6MnnOtvXoWedrOKxjrXl8GiF3CTwlqfn8mgITUMrXtDmOa5rhcOaQ4EbwRrTqzGoEIQgAQhCABCEIAEIQgAQhCABCEIAElzgASTYDSSdCaq6lkTHSSOaxjQS5zjYALJMo8qanE5TTUbXMgvY+iXj1pD6LeZdaNGVV6tnU41q0aS17eSJzKrhGaxzoKEcbJ5pltdgduYPTPPq9qrlFktUVLzUYhK5ud4xDjeQjn2MHN+S9kMFHhTA6Q8fUkXAFr/dHoDnOlVfGcfnqSc92bHsibobbn3ppSpKKwgu/UWVark/r+3Is8uUVDRtMdJGJHDQXN0NvzvOl3Uq9iOVFXPcGTi2n0YvF7dahgF0BdowitZwc29Rw6SSdJOsnST1oslALtlfAqIsiycsiykjEbsiycsiyAG7JdNUSRHOje6M72kt9+9GauEKMCSzYZlvPHYStE7d/mv940FSrqfDcSBzDxM1r2sGPvzt1O6lQiEC4IIJBGkEaCDvC5umtq1F1Uex6y2QS4lhD7sPGU97kaXRn2jWw/vStIyWyup69tmHMmAu6Jx0+1p9IfsrM8FyxewcVVDjoj4pdYFwHOD5wT+K5OAhtXhj9Rz8yN1iDvjOw/V/6WatRjPe1Pr8mmjXlDd1rp0yNpQqDkNl0KgtpqvxKjzWvOhshGw+q7m29ivyW1KcqctGQzp1I1I6UQQhCoXBCEIAEIQgAQhCABNTzNYxz3uDWMBc5xNgANZKdWT8ImUL6uYYfSm7A8NlLfTkHo39Vu3n9i60qTqSwXc5Vqqpx0n2zPBlFjU+L1Ip6e7KdhuL6iAf50nwCcr8Tgw6PwelAfOR85KdNjvdvO4bE3iFWzDYBTQEOqHjOml9W/x3DZrVOJJJJJJJuSdJJTaEFgkti9RROcsW3vPb5eR2aVz3F73FznG5cTclcAXQEoBaDicASgEoBKAQQJAXbJYC7ZSQIsiydsiyAGrIsnbIsgBmySQniFwhADJCSQnSEkhQTiNEL3YNjM1K/OjN2nz4z5rh8DzryEJBChrHaTs2F0xTDYa+Lwqj8SdtjJHexJGzmduO1WTg8yzM9qSqNp2izHu0cYBradzh29SzDCsSlppRLEbEaHNOpzfVKseO0jKmNuIUd2yMIdMxvnNcNOeLbR2jSs1WipLRfZ9DTSquMtKPddUbYhVTIPKcV0Fn2FREA2RvrbpBzG3UepWtKJxcJOL2jeE1OKktgIQhVLAhCEACEJLnAAkmwAuSdyAKnwiZReB0xbG60812R/Vb6UnUNA5yNyz7CmigpjVSC9TOCyBrtjTpLz+Z6htXa2q+VMTfI4+TxZzr7BTx7fvH8+ZQmUGKGpnc/VG3xIm7AwatHPrTehR0IqLzfwJ69bTk5LZsXuzwySOe5z3kuc4lzidZJ2oAXAEsBbDKACWAgBOAKSB6hopZXiOKNz3nU1oufbzKWGSGIfRX9n+1c+CaBohnksM4yBmdtzQL27Vf0vrXsoTcUtgwo2cZwUpN6+hh/wDCOIfRH+8f7XkxDBamAAzQvjB0AuAtfdcLe1E5UwtfRVQcAQIJXi+xzGlzT1EBUhfycknFFp2EFFtSZhtkWS7Ltk1wFg3ZcsnbL1YVEHVEDXC7XSRgjeM4aFD1LEEsXgO0uTdbKwPjppHMdpDrAXG8XIThyQxD6JJ7wtvaAAANAGgJSU/9Cf8Aleo1/wCfD/T9Pgwx2SGIa/BJOxQcjCCQQQQSCCLEEawRsX0esf4ToWtr7tAGfFG91trruFz1NHuXe3u3VnotHC4tI0oaUW+5TCEkhOkJBC2mIaIUlk7jDqWbO1xP8SVmwt323hR5CSQokk1gyU8NZaah7sMrYqqn8aCXx2ganRm2fF2gjqWz0NWyaNksZzmSNDmkbisSwCQVMEtDIfGAM1O47Hi5LP3vKs/BHjJHGUMh0sLpIgdmn5xg6/G63Jfd0sY6XNfg32lXCWjyf5NOQhCWjMEIQgAVQ4TcWMFC9rTaSoPEN35h88/huPvK3rH+FCqNRiENM03EYZHb+pIRfssu9tDTqLHYtZnuZ6FN4bXqXcgyfBsPDRolrDnO3iBuodZ/MqCAUjlHVCSoeG/y4rQx/wBrNH53Ue1OYrViJpbcBQCWAkgJwBXKsUAnAFxoSwFJBqPBRyWXpf0hXhUjgq5LL0v6Qrukd1xpZj214McgUdlFyOr+zT9xykVHZQ8jq/s0/ccuVPfjmjrLYzD7LtksBdsvSHm0N2XswUeUwdKzvBeey9mCjymDpWd4Ks915MvDeWaNwQhC80ejBZLwpDy5vQR9561pZNwo8ub0Efeetljxez9jJe8HuilkJshPkJshOBMMkJBCdITZCglBTVDopGSMNnMcHD2hWDEazwetpq+HQyYNnsN/mys/e9V0qVpzxtDLEdLqeQVEfRv8WRvsvY9a5yS55di8W+Wfc36CZr2Ne03a9rXtO8EXBTqp/BfiXH4exrjd0DnQH+0Wcz/FwH3VcEinHQk49B9CSnFSXMEIQqlgWCNrxLX1dXe4YKidhP8Axx9rme5bXjtTxVLUyDXHBNIPa1hI7V8/UZzaefe50EXUC5x/Jq32McVJ9hffSwcVm/g8zUsJLUtqZi0WEsJLU4rFRbUtoSWpbVIGo8FfJZel/SFdlSeCzk0vSjuhXZIrrjSHttwY5Ao7KDklX9nn7jlIqPx/ktV9nn7jlyp78c0dZbrMWAXbJQC7ZelPNobsvZgw8pg6WPvBechevBx5TD0rO8FWe68mWhvLNG1IQheZPSAsm4UOXN6CPvPWsrKOE/lregj7z1ssOL2fsZL7g90U1wSHJxyQ5ORMMuSHJxybcqkjZXvyfktMGHzZmSQu+8DbtsvC5EMuY9jx6Dmv9xB+ChrFFk8GX/gcqSyepgJ85jX2+swlp7CtYWKZEy8VjIaNT3zR+8E/BbWk94v5MeqTG1m/48OjaBCELKayAy7fm4bWEf8AqLfeQPisIDvmAP6pP+IW48IgJwyrt6jD1CRhKwlrzm5uy+d12smdjuPP2Fd9vrL3FNS2pISmrejCONTrU01OhWKi2pxqbanGqQNR4LeTS9L+kK6qlcFvJpel/SFdUiuuNLMe2vBjkCj8e5LVfZ5+45SCj8d5LVfZ5+45cqe/HNHWW6zHAEoBcalhenPNoQQvVhA8ph6RneC85XpwjlMPSM7wVZ7ryZaG8s0bOhCF5c9ICynhO5a3oI+89assp4T+Wt6CPvPW2w4vZ+xjvuD3RTnJDktyQ5OBONOTbk4U25QA2UhyWUgqrLE9k3P/AOUpHjWZIidO1zBf8yt8Xzzko69fSdLGPdoX0Mld9vRy92NLHcln7IEIQsJuIPLaLPw6sG6F7/wjO+C+fmr6TxGlEsMsR1SxyRH2OaR8V82NBGg6CNBB37kysH9Ml5iy/X1Ref76jjUtqQ1LamCMA41OtTLU41WKjrU41NtS2qQNS4LeTS9KO6FdVSeCzk0vS/pCuyRXXGlmPbbgxyBR+Pclqvs8/ccpBR+P8kqvs8/ccuVPfjmjrPdZjYKUCmgUq69MebQslenCD5TD0jO8F47r1YOfKYOlZ3gqz3Xky0N5Zo2tCELzB6QFlPCdy1vQR9561ZZRwn8tb0Efeetthxez9jJfcHuinuSHJTkhycCYbcm3Jbk25QAgpDkpyS5VZYmch4s/EaQf1c73An4L6BWIcFdNn4ix1tEccj+vUPzW3pVfPGol5DWxX8bfmCEIWI2gvnrLCh4ivqo9Q40yN/tf44t77dS+hVk/DHhtpIakDQ5pjefrN0t7CVssp6NTDqZL2GlTx6GetS2ptqU1NkKB0JxqaBTgKkgeaUppTQKcBUkGqcFfJZel/SFdlSOCrksvS/pCu6R3XGlmPbXgxyBR2UHJKv7PP3HKRUdlDyOr+zT9xy5U9+OaOst1mLArt00Cu3XpTzaF3XswY+UwdLH3gvBdezBT5TB0sfeCrPdeTLw3lmjcUIQvMnowWTcKHLm9BH3nrWVkvCifLm9BH3nrZY8Xs/YyX3B7op5KS5dJSCU4EwhybKUSkEqCUIKS5KJTbioJNO4GaHRVTkayyFp9njOHa33rT1Xcg8L8GoIGEWe9pnk357/GsfYM0fdViSOvPTqNjyhDQpxX7rBCELidgUFlpg/hdFNEBd4HGx9IzSB16R1qdQpjJxaaIlFSTT5nzGNGg6CNBB0adyWCrXwmYD4NVmVgtFUF0g3CT02/HrVSBT6E1OKkuYgnBwk4vkOApwFMgpYK6FB4FOApkFKBUkGscFHJZel/SFeFQuCaZpgnZcZwkDiNtiNfYr6kV1xpD214McgUdlFyOr+zVHccpFROVMjW0VUXEAGCVgv6zmlrR1kgda509+OaOst1mJ3Xbpq67dejxPOIcuvbgh8qg6VneCjrr14RKG1ELnGzRJGSdwzhpVZbryLQ3lmb0hcXV5s9GwWScKR8ub0EfeetbWP8KErXV9gQc2FjHW2Ou42PU4HrWyx43Z+xkveF3RUSUgldJSCU4ExwlNkrpKSSoLHCVMZF4P4XWxRkXY08bJ/Y3TbrNh1qFcVsnBbgJp6YzvbaWos7TrbEPNHXpPWNyz3FXw6bfPYjvb0vEqJclrZdxuXUISQdghCEACEIQBDZUYIytppIXaHHxo3+rIPNd8DzErAKqmfFI+ORpa+N2Y5p2EL6YVC4SskzUs8JgbeeMeMwa5Ixu+sNm/VuWy0r6D0ZbH6GO7oaa0ltXqjIgUoFNhKBTYUjoKWCmQUsFSQe3D8QmgeJIJHRvGjOadm4jURzFTIy0xL6U/8ABH/8qtgpQKrKEJa5JPNFo1Jx1Rk1k8CxjLPEvpTv+OP/AEvHiWOVVQA2eZ8jWm4abNF99mgAqKBSrqY04J4qKWSB1JvU5N9xy6Lpu6Lq5QcuuEpF126AJmlyoromNjjqZGsboaCGPsNwLmk2Thy0xL6U78Ef+lA3SCVzdKm9sV9kdFVqLZJ/dk+7LPEtXhTvwMHwUDJIXEucS5ziXFziSSTpJJOspBKSSpjCMd1JZLArKcpbzbzeJ0lIJQSkEqSAJSSUEr1YNhctVMyGJt3vOvY1u155gqtpLFkpNvBE1wf5OmtqQXt+YizZJTsJ9GPrt7gt1aAAANAGgDmUbk/g0dHAyCIaG6XO2uedbj+9ylEluK3izx5cv3zHdvR8KGHN7f3yBCELgdwQhCABCEIAEIQgDMOETIcuLqukZcnxpoWjSf6jBtO8dazIFfTiz3Lfg/bPnT0gaybS58WpsnO31Xdh5kwtrrDCE+z+fkX3Npj9cO6+DJwV0FcnhfG9zJGuY9ps5rhYg84XAUyFo6CugpsFdBUgOgrt01ddugjAdui6bui6AHLoum7ozkBgLukkpN1y6AwFEpJKSSglBJ0lIJQSpLJ7J+orZOLhZoB8eV2hjBvJ+A0qraSxZKTk8FtPJhuHzVErIoWGR7zoA2Da4nYBvW45HZMR0EWaLPmeAZZN59Vu5oT2S2TEFBHmxjOkcBxkrh4zj8BzKdSi4ufE+mOz8ja2tvD+qW38fvUEIQsprBCEIAEIQgAQhcJQB1CZdUNG1NurWDagD1IXhOIs3ps4qzegDxZS5KU1c351ubIBZsrNDh7fWHMVkeUeRdXRkuczjYhqliBIt9Zutv70rZzizN6afjDNWghaKNzOnqWtdP3Z+PIz1raFXW9T6/u0+ewUoFavjuTWH1JLmtNPKdOfFYAne5mo9VjzqkYlkdURXMZZM3ew5rvwlMad3Tnzwz+RdUtKkOWOXwQN0XRPC+M2kY5h+sCkZy0GbyF3RdIui6nEBd126bui6AF3XCUguXqo8MqJj83E93Paw95UNpLFgk28EeclEUbnuDWNc9x0BrQXE9QVwwrIXOsamYMG1kdnO9mcdA9xV9wSno6RtoImsO158Z59rjpWSpeU46o636GynZVJb2pepUMmeDWWQtkrSYo9B4pp+cdzOPoDt9mtalQUUUEbY4WNjY3QGtFv+14RjLd6dGLM3pdVrTqPGQxpUYUlhH7kohRgxVm9OtxFm9cjqe5C8ja5h2p1tS07UAPIXAbrqABCEIAEzUA20J5CAK3VxS30XUfLDLzq4mMHYkGnbuQBSXxS86ZMUnOr06kbuSPAGbkAUYxyc6QY386vTsPZuSPktm5AFHzH86DG/nV3+S2bkHC2bkAUWSIuFnNDhuIuo6fAIH64W/cu3u2WjHB2blz5IZuUxlKO68CsoxlvLHMy9+SUB1cY32PB/MFMnI+PY9/+J+C1b5HZuR8js3Lr/wCiqv7M5u2pP+qMrbkhFtdIfYWj4J+PJWnGtjnf3OP6bLTfkhm5HyOzch3FV/2YK3pL+q+xQKfCoo/Mia077XPvOlesNcrp8js3I+R2blybb1s6pJLBFODH86OLfzq7Nwpm5d+S2blBJSOLfzpxscnOrn8ls3JbcOYNiAKWIpOdOsil51cvAGbkptG0bEAVKOKXnXvpYpb7VYRTN3JYjA2IAapAbaV6FwBdQAIQhAAhCEACEIQAIQhAAhCEACEIQAIQhAAhCEACEIQAIQhAAhCEACEIQAIQhAAhCEACEIQAIQhAH//Z' }; // ('./resources/ui_pause.png');
const img_play =    {uri: 'data:image/png;base64,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' }; // ('./resources/ui_play.png');
const img_playjumpleft =    {uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc-Yga0R3JUICflD9QXJFcMlKFwvXN8dA3JA&usqp=CAU' }; // ('./resources/ui_playjumpleft.png');
const img_playjumpright =    {uri: 'data:image/png;base64,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' }; // ('./resources/ui_playjumpright.png');





class MessageAudioPlay extends React.Component{




    static navigationOptions = props => ({
        //title:props.navigation.state.params.title,
        title: props.data.title
    })




    constructor(){
        super();
        this.state = {
            playState:'paused', //playing, paused
            playSeconds:0,
            duration:0
        }
        this.sliderEditing = false;
    }





    componentDidMount(){
        this.play();
        
        this.timeout = setInterval(() => {
            if(this.sound && this.sound.isLoaded() && this.state.playState == 'playing' && !this.sliderEditing){
                this.sound.getCurrentTime((seconds, isPlaying) => {
                    this.setState({playSeconds:seconds});
                })
            }
        }, 100);
    }






    componentWillUnmount(){
        if(this.sound){
            this.sound.release();
            this.sound = null;
        }
        if(this.timeout){
            clearInterval(this.timeout);
        }
    }






    onSliderEditStart = () => {
        this.sliderEditing = true;
    }




    onSliderEditEnd = () => {
        this.sliderEditing = false;
    }




    onSliderEditing = value => {
        if(this.sound){
            this.sound.setCurrentTime(value);
            this.setState({playSeconds:value});
        }
    }







    play = async () => {
        if(this.sound){
            this.sound.play(this.playComplete);
            this.setState({playState:'playing'});
        }else{


            // const filepath = this.props.navigation.state.params.filepath;
            // var dirpath = '';
            // if (this.props.navigation.state.params.dirpath) {
            //     dirpath = this.props.navigation.state.params.dirpath;
            // }



            const filepath = props.data.filepath;
            var dirpath = '';
            if (props.data.dirpath) {
                dirpath = props.data.dirpath;
            }



            console.log('[Play]', filepath);
    
            this.sound = new Sound(filepath, dirpath, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    this.setState({playState:'paused'});
                }else{
                    this.setState({playState:'playing', duration:this.sound.getDuration()});
                    this.sound.play(this.playComplete);
                }
            });    
        }
    }





    playComplete = (success) => {
        if(this.sound){
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
                Alert.alert('Notice', 'audio file error. (Error code : 2)');
            }
            this.setState({playState:'paused', playSeconds:0});
            this.sound.setCurrentTime(0);
        }
    }





    pause = () => {
        if(this.sound){
            this.sound.pause();
        }

        this.setState({playState:'paused'});
    }







    jumpPrev15Seconds = () => {this.jumpSeconds(-15);}



    jumpNext15Seconds = () => {this.jumpSeconds(15);}




    jumpSeconds = (secsDelta) => {
        if(this.sound){
            this.sound.getCurrentTime((secs, isPlaying) => {
                let nextSecs = secs + secsDelta;
                if(nextSecs < 0) nextSecs = 0;
                else if(nextSecs > this.state.duration) nextSecs = this.state.duration;
                this.sound.setCurrentTime(nextSecs);
                this.setState({playSeconds:nextSecs});
            })
        }
    }









    getAudioTimeString(seconds){
        const h = parseInt(seconds/(60*60));
        const m = parseInt(seconds%(60*60)/60);
        const s = parseInt(seconds%60);

        return ((h<10?'0'+h:h) + ':' + (m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
    }














    render(){

        const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
        const durationString = this.getAudioTimeString(this.state.duration);

        return (
            <View style={{flex:1, justifyContent:'center', backgroundColor:'black'}}>


<TouchableOpacity
onPress={()=>props.ModalOFF}>

  <Text style={{color:"white"}}>cerrar</Text>

</TouchableOpacity>


                <Image source={img_speaker} style={{width:150, height:150, marginBottom:15, alignSelf:'center'}}/>
                <View style={{flexDirection:'row', justifyContent:'center', marginVertical:15}}>
                    <TouchableOpacity onPress={this.jumpPrev15Seconds} style={{justifyContent:'center'}}>
                        <Image source={img_playjumpleft} style={{width:30, height:30}}/>
                        <Text style={{position:'absolute', alignSelf:'center', marginTop:1, color:'white', fontSize:12}}>15</Text>
                    </TouchableOpacity>
                    {this.state.playState == 'playing' && 
                    <TouchableOpacity onPress={this.pause} style={{marginHorizontal:20}}>
                        <Image source={img_pause} style={{width:30, height:30}}/>
                    </TouchableOpacity>}
                    {this.state.playState == 'paused' && 
                    <TouchableOpacity onPress={this.play} style={{marginHorizontal:20}}>
                        <Image source={img_play} style={{width:30, height:30}}/>
                    </TouchableOpacity>}
                    <TouchableOpacity onPress={this.jumpNext15Seconds} style={{justifyContent:'center'}}>
                        <Image source={img_playjumpright} style={{width:30, height:30}}/>
                        <Text style={{position:'absolute', alignSelf:'center', marginTop:1, color:'white', fontSize:12}}>15</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginVertical:15, marginHorizontal:15, flexDirection:'row'}}>
                    <Text style={{color:'white', alignSelf:'center'}}>{currentTimeString}</Text>
                    <Slider
                        onTouchStart={this.onSliderEditStart}
                        // onTouchMove={() => console.log('onTouchMove')}
                        onTouchEnd={this.onSliderEditEnd}
                        // onTouchEndCapture={() => console.log('onTouchEndCapture')}
                        // onTouchCancel={() => console.log('onTouchCancel')}
                        onValueChange={this.onSliderEditing}
                        value={this.state.playSeconds} maximumValue={this.state.duration} maximumTrackTintColor='gray' minimumTrackTintColor='white' thumbTintColor='white' 
                        style={{flex:1, alignSelf:'center', marginHorizontal:Platform.select({ios:5})}}/>
                    <Text style={{color:'white', alignSelf:'center'}}>{durationString}</Text>
                </View>
            </View>
        )
    }
}


export default MessageAudioPlay;