"use client";

import React from 'react';
import { 
  Play, 
  Music, 
  FileText, 
  Lock, 
  Heart, 
  MessageCircle, 
  Download,
  Paperclip
} from 'lucide-react';
import styles from './FeedPost.module.css';

interface FeedPostProps {
  type: 'video' | 'image' | 'audio' | 'pdf';
  creator: string;
  timestamp: string;
  tier: string;
  content: string;
  mediaUrl?: string;
  isLocked: boolean;
}

const FeedPost = ({ type, creator, timestamp, tier, content, mediaUrl, isLocked }: FeedPostProps) => {
  
  const renderMedia = () => {
    switch (type) {
      case 'video':
        return (
          <div className={styles.videoPlaceholder} style={{ backgroundImage: `url(${mediaUrl})` }}>
            <div className={styles.playButton}><Play fill="currentColor" size={32} /></div>
          </div>
        );
      case 'audio':
        return (
          <div className={styles.audioWaveform}>
            <div className="p-4 bg-brand-yellow border-4 border-brand-charcoal rounded-xl mr-4">
              <Music size={24} />
            </div>
            {[40, 70, 45, 90, 65, 80, 30, 50, 85, 40].map((h, i) => (
              <div key={i} className={styles.waveformBar} style={{ height: `${h}%` }} />
            ))}
          </div>
        );
      case 'pdf':
        return (
          <div className={styles.pdfDownload}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 border-2 border-brand-charcoal rounded-lg">
                <Paperclip size={20} />
              </div>
              <div>
                <p className="font-black text-sm uppercase">Resource_Guide.pdf</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">2.4 MB • PDF Document</p>
              </div>
            </div>
            <Download size={20} className="cursor-pointer hover:text-brand-yellow" />
          </div>
        );
      default:
        return <img src={mediaUrl} alt="Post content" className="w-full h-auto" />;
    }
  };

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.creatorInfo}>
          <span className={styles.creatorName}>{creator}</span>
          <span className={styles.timestamp}>{timestamp}</span>
        </div>
        <div className={styles.tierBadge}>{tier} Exclusive</div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <p className={styles.postText}>{content}</p>
        
        <div className={styles.mediaContainer}>
          {isLocked && (
            <div className={styles.lockedOverlay}>
              <div className="p-4 bg-white border-4 border-brand-charcoal rounded-full mb-4">
                <Lock size={32} />
              </div>
              <p className="font-black uppercase text-sm">Content Locked</p>
              <p className="text-xs font-bold text-gray-600 mb-2">Upgrade to the {tier} to view this post</p>
              <button className={styles.upgradeBtn}>Upgrade Now</button>
            </div>
          )}
          {renderMedia()}
        </div>
      </div>

      {/* Footer Interaction Bar */}
      <div className={styles.footer}>
        <div className={styles.interaction}>
          <Heart size={20} strokeWidth={3} /> 24
        </div>
        <div className={styles.interaction}>
          <MessageCircle size={20} strokeWidth={3} /> 12
        </div>
      </div>
    </div>
  );
};

export default FeedPost;