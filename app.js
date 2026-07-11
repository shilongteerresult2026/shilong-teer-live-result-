// ============================================================
// 🔥 VIP SYSTEM - Using teer_common_numbers Table
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const vipBtn = document.getElementById('vipUnlockBtn');
    const vipModal = document.getElementById('vipModal');
    const vipModalClose = document.getElementById('vipModalClose');
    const vipNumberValue = document.getElementById('vipNumberValue');
    const vipExtraInfo = document.getElementById('vipExtraInfo');
    const vipStatusText = document.getElementById('vipStatusText');
    
    let isUnlocking = false;
    let countdownInterval = null;
    let adWindow = null;

    // ============================================================
    // Supabase Config
    // ============================================================
    const SUPABASE_URL = 'https://bwjjqidmeooyojjvtqjs.supabase.co';
    const SUPABASE_ANON_KEY = 'sb_publishable_qokEKHuO9i1LVn24Hxp3g_4MZQ7wIg';
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // ============================================================
    // 📅 IST Date Function
    // ============================================================
    function getTodayIST() {
        try {
            return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
        } catch (e) {
            // Fallback if Intl fails
            const now = new Date();
            const istOffset = 5.5 * 60 * 60 * 1000;
            return new Date(now.getTime() + istOffset).toISOString().split('T')[0];
        }
    }

    // ============================================================
    // 📥 Load VIP Number from Supabase
    // ============================================================
    async function loadVIPNumberFromSupabase() {
        try {
            const today = getTodayIST();
            const { data, error } = await supabaseClient
                .from('teer_common_numbers')
                .select('*')
                .eq('result_date', today)
                .limit(1);

            if (error) {
                console.error('❌ Supabase error:', error);
                return null;
            }
            
            if (data && data.length > 0) {
                const row = data[0];
                const frDirect = row.shillong_fr_direct || '--';
                const srDirect = row.shillong_sr_direct || '--';
                return `${frDirect} | ${srDirect}`;
            }
            return null;
        } catch (err) {
            console.error('❌ VIP load error:', err);
            return null;
        }
    }

    // ============================================================
    // ⏱️ Show Ad & Start Countdown
    // ============================================================
    function startCountdown(seconds, onComplete) {
        let remaining = seconds;
        
        // Status Update
        vipStatusText.textContent = `⏳ অনুগ্রহ করে অপেক্ষা করুন... ${remaining} সেকেন্ড বাকি`;
        vipStatusText.style.color = '#ff9800';
        vipBtn.textContent = `⏳ ${remaining}s`;
        vipBtn.disabled = true;

        // 🎯 Open Ad (OMG10 Link)
        try {
            adWindow = window.open('https://omg10.com/4/11160871', '_blank');
            console.log('📢 Ad opened for VIP unlock');
        } catch (e) {
            console.log('⚠️ Ad trigger error:', e);
        }

        // Clear previous interval if any
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }

        // Start Countdown
        countdownInterval = setInterval(function() {
            remaining--;
            
            if (remaining > 0) {
                vipStatusText.textContent = `⏳ অনুগ্রহ করে অপেক্ষা করুন... ${remaining} সেকেন্ড বাকি`;
                vipBtn.textContent = `⏳ ${remaining}s`;
            } else {
                // Countdown Finished
                clearInterval(countdownInterval);
                countdownInterval = null;
                vipBtn.textContent = '⏳ লোড হচ্ছে...';
                vipStatusText.textContent = '⏳ VIP নাম্বার লোড হচ্ছে...';
                
                // 🎯 Close Ad Window
                try {
                    if (adWindow && !adWindow.closed) {
                        adWindow.close();
                        console.log('📢 Ad window closed automatically');
                    }
                } catch (e) {
                    console.log('⚠️ Cannot close ad window:', e);
                }
                adWindow = null;
                
                // Call onComplete
                onComplete();
            }
        }, 1000);
    }

    // ============================================================
    // 🔓 Main Unlock Function
    // ============================================================
    window.unlockVIP = async function() {
        // Prevent multiple clicks
        if (isUnlocking) {
            vipStatusText.textContent = '⏳ ইতিমধ্যে প্রক্রিয়া চলছে, অনুগ্রহ করে অপেক্ষা করুন...';
            vipStatusText.style.color = '#ff9800';
            return;
        }
        
        isUnlocking = true;

        // Reset any existing state
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
        if (adWindow && !adWindow.closed) {
            try { adWindow.close(); } catch(e) {}
            adWindow = null;
        }

        // Start Countdown (5 seconds)
        startCountdown(5, async function() {
            try {
                // Load VIP Number from Supabase
                const vipNumber = await loadVIPNumberFromSupabase();
                
                if (vipNumber) {
                    vipNumberValue.textContent = vipNumber;
                    vipExtraInfo.innerHTML = '✅ <span style="color:#008000;">VIP Number unlocked successfully! আজকের স্পেশাল নাম্বার।</span>';
                    vipStatusText.textContent = '✅ VIP নাম্বার আনলক সম্পূর্ণ!';
                    vipStatusText.style.color = '#008000';
                } else {
                    // Default VIP Number (Fallback)
                    vipNumberValue.textContent = '47, 68 | 86, 15';
                    vipExtraInfo.innerHTML = '⚠️ <span style="color:#ff9800;">[Demo Mode] আজকের ডেটা নেই, ডিফল্ট দেখানো হচ্ছে।</span>';
                    vipStatusText.textContent = '⚠️ VIP নাম্বার লোড হয়েছে (Demo Mode)';
                    vipStatusText.style.color = '#ff9800';
                }
                
                // Show Modal
                vipModal.classList.add('active');
                
            } catch (err) {
                console.error('❌ VIP unlock error:', err);
                vipStatusText.textContent = '❌ VIP আনলক করতে ব্যর্থ! আবার চেষ্টা করুন।';
                vipStatusText.style.color = '#cc0000';
            }
            
            // Reset Button
            vipBtn.disabled = false;
            vipBtn.textContent = '🔓 আনলক করুন / Unlock Now';
            isUnlocking = false;
        });
    };

    // ============================================================
    // 🔘 Event Listeners
    // ============================================================
    if (vipBtn) {
        vipBtn.addEventListener('click', window.unlockVIP);
    }

    // Close Modal
    if (vipModalClose) {
        vipModalClose.addEventListener('click', function() {
            vipModal.classList.remove('active');
            // Cleanup
            if (countdownInterval) {
                clearInterval(countdownInterval);
                countdownInterval = null;
            }
            vipBtn.disabled = false;
            vipBtn.textContent = '🔓 আনলক করুন / Unlock Now';
            isUnlocking = false;
        });
    }

    // Close Modal on Outside Click
    if (vipModal) {
        vipModal.addEventListener('click', function(e) {
            if (e.target === vipModal) {
                vipModal.classList.remove('active');
                if (countdownInterval) {
                    clearInterval(countdownInterval);
                    countdownInterval = null;
                }
                vipBtn.disabled = false;
                vipBtn.textContent = '🔓 আনলক করুন / Unlock Now';
                isUnlocking = false;
            }
        });
    }

    console.log('✅ VIP System Loaded Successfully! (Using teer_common_numbers table)');
});


// ============================================================
// 🌍 LANGUAGE SWITCHER
// ============================================================
window.showBangla = function() {
    console.log("Language changed to Bangla");
    alert("ওয়েবসাইটটি বাংলায় দেখাচ্ছে!");
};

window.showEnglish = function() {
    console.log("Language changed to English");
    alert("Website is showing in English!");
};


// ============================================================
// 🔗 SOCIAL SHARE SYSTEM
// ============================================================
window.shareOnFacebook = function() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
};

window.shareOnWhatsApp = function() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("আজকের স্পেশাল VIP তীর নাম্বারগুলো দেখুন: ");
    window.open(`https://api.whatsapp.com/send?text=${text}%0A${url}`, '_blank');
};

window.shareOnTwitter = function() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Shillong Teer Live Result & VIP Numbers: ");
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
};

window.shareOnTelegram = function() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("আজকের স্পেশাল VIP তীর নাম্বারগুলো দেখুন: ");
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
};

window.copyLink = function() {
    navigator.clipboard.writeText(window.location.href)
        .then(() => alert("✅ লিংক কপি করা হয়েছে! (Link Copied!)"))
        .catch(() => alert("❌ কপি করতে ব্যর্থ!"));
};


// ============================================================
// 💬 COMMENT SYSTEM (Demo)
// ============================================================
window.addComment = function() {
    const commentInput = document.getElementById('commentInput');
    const commentName = document.getElementById('commentName');
    
    if (commentInput && commentInput.value.trim() === '') {
        alert("অনুগ্রহ করে আপনার মতামত লিখুন!");
        return;
    }
    
    alert("আপনার মন্তব্য সফলভাবে গ্রহণ করা হয়েছে! (Your comment has been submitted!)");
    
    if (commentInput) commentInput.value = '';
    if (commentName) commentName.value = '';
};
