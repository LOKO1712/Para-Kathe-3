onload = () =>{
        document.body.classList.remove("container");
};


document.addEventListener('DOMContentLoaded', () => {
        const love = document.querySelector('.love-message');
        const textNode = document.querySelector('.love-message__text');
        if (!love || !textNode) return;

        const first = 'Lirios Para Mi Delirio';
    
        const second = 'Te Quiero Mucho Mi Niña de Ojitos Lindos 💗';
        const letterDelay = 0.18; 

        function renderMessage(txt) {
                textNode.textContent = '';

                
                function getGraphemes(str) {
                        if (typeof Intl !== 'undefined' && Intl.Segmenter) {
                                return Array.from(new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(str), s => s.segment);
                        }
                        
                        return Array.from(str);
                }

                
                function isEmojiGrapheme(s) {
                        try { return /\p{Extended_Pictographic}/u.test(s); } catch (e) {
                                const hearts = ['❤','♥','💖','💗','💘','💝','💕','💓','💞','💟','❤️','💗'];
                                if (hearts.includes(s)) return true;
                                const cp = s.codePointAt(0);
                                return typeof cp === 'number' && cp >= 0x1F300 && cp <= 0x1FAFF;
                        }
                }

                
                const tokens = txt.split(/(\s+)/);
                let letterIndex = 0; 

                tokens.forEach(token => {
                        if (/^\s+$/.test(token)) {
                                
                                const sp = document.createElement('span');
                                sp.textContent = '\u00A0'.repeat(token.length);
                                
                                sp.style.whiteSpace = 'pre';
                                textNode.appendChild(sp);
                                return;
                        }

                        
                        const wordWrap = document.createElement('span');
                        wordWrap.className = 'word';
                        const graphemes = getGraphemes(token);
                        graphemes.forEach(g => {
                                const chSpan = document.createElement('span');
                                if (isEmojiGrapheme(g)) {
                                        const svgNS = 'http://www.w3.org/2000/svg';
                                        const svgEl = document.createElementNS(svgNS, 'svg');
                                        svgEl.setAttribute('viewBox', '0 0 24 24');
                                        svgEl.setAttribute('width', '1em');
                                        svgEl.setAttribute('height', '1em');
                                        svgEl.setAttribute('aria-hidden', 'true');
                                        svgEl.classList.add('emoji-svg');
                                        const path = document.createElementNS(svgNS, 'path');
                                        path.setAttribute('d', 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 3.99 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z');
                                        path.setAttribute('fill', '#ff2d55');
                                        svgEl.appendChild(path);
                                        chSpan.appendChild(svgEl);
                                } else {
                                        chSpan.textContent = g;
                                }
                                chSpan.style.animationDelay = `${letterIndex * letterDelay}s`;
                                wordWrap.appendChild(chSpan);
                                letterIndex++;
                        });
                        textNode.appendChild(wordWrap);
                });
        }

        
        function showLines(lines, startIndex = 0, durations) {
                if (!Array.isArray(lines) || startIndex >= lines.length) return;
                const i = startIndex;
                
                if (i === 0) love.classList.add('long');
                renderMessage(lines[i]);
                love.classList.add('show');

                
                const visibleMs = (durations && typeof durations[i] === 'number') ? durations[i]
                        : Math.max(2500, Math.round(lines[i].length * letterDelay * 1000) + 1000);

                setTimeout(() => {
                        
                        if (i + 1 < lines.length) {
                               
                                love.classList.remove('show');
                               
                                setTimeout(() => {
                                        showLines(lines, i + 1, durations);
                                }, 600);
                        } else {
                               
                                love.classList.remove('long');
                                
                                love.classList.add('show');
                                
                                setTimeout(() => { love.classList.add('pulse'); }, 300);
                        }
                }, visibleMs);
        }

                                
                                const audioEl = document.getElementById('bg-audio');
                                if (audioEl) {
                                        
                                        audioEl.play().catch(()=>{
                                                const resume = () => { audioEl.play().catch(()=>{}); document.removeEventListener('click', resume); };
                                                document.addEventListener('click', resume);
                                        });
                                }

      
        setTimeout(() => {
                renderMessage(first);
                love.classList.add('show');

                setTimeout(() => {
                        love.classList.remove('show');
                        
                        setTimeout(() => {
                                renderMessage(second);
                                love.classList.add('show');

                                
                                const longLines = [
                                        "Esto es un detallito que quise tener contigo y aunque es una bobada quiero que sepas que lo hice con todo el cariño del mundo.",
                                        "Te amo mucho Mi vida 💗"
                                ];
                                
                                const longLineDurations = [ undefined, 8000 ];
                                
                                setTimeout(() => { showLines(longLines, 0, longLineDurations); }, 4500);

                        }, 250);
                }, 3000);

        }, 2500);
});
