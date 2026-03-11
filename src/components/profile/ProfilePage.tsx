"use client";

import React, { useState, useRef } from 'react';
import {
  User, MapPin, Edit2, Camera, Check, X, UserPlus,
  Search, Plus, Trash2, ExternalLink,
  Twitter, Youtube, Instagram, Globe, Linkedin, Facebook,
  Github, Mail, Phone, Briefcase, Calendar,
  ChevronDown, ChevronUp, Image, Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Users, Lock
} from 'lucide-react';
import { Header } from '../header/Header';
import { EditorialModal } from '../tierSelection/components/EditorialModal';
import TierSelection from '../tierSelection/tierSelection';
import styles from './ProfilePage.module.css';

/* ─── Types ─────────────────────────────────────────────────────── */

interface SocialLink {
  id: string;
  platform: string;
  handle: string;
  url: string;
}

interface Connection {
  id: string;
  name: string;
  avatar: string;
  role: string;
  mutualConnections: number;
  status: 'connected' | 'pending' | 'suggested' | 'request-incoming';
}

/* ─── Mock Data ─────────────────────────────────────────────────── */

const INITIAL_CONNECTIONS: Connection[] = [
  { id: 'c1', name: 'Layla Hassan', avatar: 'https://i.pravatar.cc/150?u=c1', role: 'Content Creator', mutualConnections: 12, status: 'connected' },
  { id: 'c2', name: 'Omar Khalid', avatar: 'https://i.pravatar.cc/150?u=c2', role: 'Filmmaker', mutualConnections: 7, status: 'connected' },
  { id: 'c3', name: 'Sara Ahmed', avatar: 'https://i.pravatar.cc/150?u=c3', role: 'Photographer', mutualConnections: 3, status: 'connected' },
  { id: 'c4', name: 'Bilal Raza', avatar: 'https://i.pravatar.cc/150?u=c4', role: 'Designer', mutualConnections: 9, status: 'connected' },
  { id: 'c5', name: 'Noor Fatima', avatar: 'https://i.pravatar.cc/150?u=c5', role: 'Educator', mutualConnections: 5, status: 'connected' },
  { id: 'c6', name: 'Zain Shah', avatar: 'https://i.pravatar.cc/150?u=c6', role: 'Podcast Host', mutualConnections: 2, status: 'connected' },
];

const INCOMING_REQUESTS: Connection[] = [
  { id: 'r1', name: 'Ayesha Mirza', avatar: 'https://i.pravatar.cc/150?u=r1', role: 'Writer', mutualConnections: 4, status: 'request-incoming' },
  { id: 'r2', name: 'Hassan Ali', avatar: 'https://i.pravatar.cc/150?u=r2', role: 'Developer', mutualConnections: 1, status: 'request-incoming' },
];

const SUGGESTIONS: Connection[] = [
  { id: 's1', name: 'Fatima Qureshi', avatar: 'https://i.pravatar.cc/150?u=s1', role: 'Artist', mutualConnections: 6, status: 'suggested' },
  { id: 's2', name: 'Raza Khan', avatar: 'https://i.pravatar.cc/150?u=s2', role: 'Musician', mutualConnections: 8, status: 'suggested' },
  { id: 's3', name: 'Maryam Iqbal', avatar: 'https://i.pravatar.cc/150?u=s3', role: 'Chef & Blogger', mutualConnections: 3, status: 'suggested' },
  { id: 's4', name: 'Ali Haider', avatar: 'https://i.pravatar.cc/150?u=s4', role: 'Travel Creator', mutualConnections: 11, status: 'suggested' },
];

const INITIAL_SOCIALS: SocialLink[] = [
  { id: 's1', platform: 'Twitter', handle: '@creator_hub', url: 'https://twitter.com/creator_hub' },
  { id: 's2', platform: 'Instagram', handle: '@creator.hub', url: 'https://instagram.com/creator.hub' },
  { id: 's3', platform: 'YouTube', handle: 'CreatorHub SA', url: 'https://youtube.com/@creatorhubsa' },
];

/* ─── Mock Posts ────────────────────────────────────────────────── */
interface Post {
  id: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  liked: boolean;
  saved: boolean;
  visibility?: 'everyone' | 'connections' | 'only-me';
}

const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    content: 'Just wrapped up filming our latest tech review — the new gear is mind-blowing. Full video drops this Friday! 🎬',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
    likes: 142, comments: 28, shares: 17, timestamp: '2h ago', liked: false, saved: false,
  },
  {
    id: 'p2',
    content: 'Building in public: here\'s how I grew from 0 to 10k subscribers in 6 months. Thread 🧵👇',
    likes: 384, comments: 52, shares: 91, timestamp: '1d ago', liked: true, saved: true,
  },
  {
    id: 'p3',
    content: 'Riyadh content creator meetup was incredible last night. So many talented people doing amazing things in the local scene 🇸🇦',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800',
    likes: 217, comments: 41, shares: 33, timestamp: '3d ago', liked: false, saved: false,
  },
];

/* ─── Platform config ───────────────────────────────────────────── */

const PLATFORM_CONFIG: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  Twitter:   { icon: <Twitter size={16} />,   color: '#1DA1F2', bg: 'rgba(29,161,242,0.12)' },
  Instagram: { icon: <Instagram size={16} />, color: '#E1306C', bg: 'rgba(225,48,108,0.12)' },
  YouTube:   { icon: <Youtube size={16} />,   color: '#FF0000', bg: 'rgba(255,0,0,0.12)' },
  LinkedIn:  { icon: <Linkedin size={16} />,  color: '#0A66C2', bg: 'rgba(10,102,194,0.12)' },
  Facebook:  { icon: <Facebook size={16} />,  color: '#1877F2', bg: 'rgba(24,119,242,0.12)' },
  GitHub:    { icon: <Github size={16} />,    color: '#333', bg: 'rgba(51,51,51,0.12)' },
  Website:   { icon: <Globe size={16} />,     color: '#6B7280', bg: 'rgba(107,114,128,0.12)' },
  Email:     { icon: <Mail size={16} />,      color: '#00C853', bg: 'rgba(0,200,83,0.12)' },
};

const PLATFORM_OPTIONS = Object.keys(PLATFORM_CONFIG);

/* ─── Sub-components ────────────────────────────────────────────── */

function ConnectionCard({
  conn,
  onAccept,
  onDecline,
  onConnect,
}: {
  conn: Connection;
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
  onConnect?: (id: string) => void;
}) {
  return (
    <div className={styles.connectionCard}>
      <img src={conn.avatar} alt={conn.name} className={styles.connectionAvatar} />
      <p className={styles.connectionName}>{conn.name}</p>
      <p className={styles.connectionRole}>{conn.role}</p>
      {conn.mutualConnections > 0 && (
        <p className={styles.connectionMutual}>{conn.mutualConnections} mutual connections</p>
      )}
      <div className={styles.connectionActions}>
        {conn.status === 'connected' && (
          <span className={styles.connBtnConnected}>Connected</span>
        )}
        {conn.status === 'request-incoming' && (
          <>
            <button className={styles.connBtnPrimary} onClick={() => onAccept?.(conn.id)}>Accept</button>
            <button className={styles.connBtnSecondary} onClick={() => onDecline?.(conn.id)}>Decline</button>
          </>
        )}
        {conn.status === 'suggested' && (
          <>
            <button className={styles.connBtnPrimary} onClick={() => onConnect?.(conn.id)}>
              Connect
            </button>
          </>
        )}
        {conn.status === 'pending' && (
          <span className={styles.connBtnSecondary} style={{ cursor: 'default' }}>Pending...</span>
        )}
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */

export default function ProfilePage() {
  // Profile fields
  const [displayName, setDisplayName] = useState('Ahmed Al-Rashid');
  const [headline, setHeadline] = useState('Content Creator · Videographer · Storyteller');
  const [location, setLocation] = useState('Riyadh, Saudi Arabia');
  const [website, setWebsite] = useState('https://creator.hub');
  const [bio, setBio] = useState(
    'Passionate content creator and visual storyteller based in Riyadh. I create videos about tech, travel, and local culture — helping Saudi creators grow their audience and monetise their passion.'
  );
  const [firstName, setFirstName] = useState('Ahmed');
  const [lastName, setLastName] = useState('Al-Rashid');
  const [email] = useState('ahmed@creatorhub.sa');
  const [phone, setPhone] = useState('+966 50 000 0000');
  const [company, setCompany] = useState('CreatorHub SA');
  const [joinDate] = useState('March 2024');

  // Edit modes
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [savedBio, setSavedBio] = useState(false);
  const [savedInfo, setSavedInfo] = useState(false);

  // Temp state for edits
  const [tempBio, setTempBio] = useState(bio);
  const [tempFirstName, setTempFirstName] = useState(firstName);
  const [tempLastName, setTempLastName] = useState(lastName);
  const [tempHeadline, setTempHeadline] = useState(headline);
  const [tempLocation, setTempLocation] = useState(location);
  const [tempWebsite, setTempWebsite] = useState(website);
  const [tempPhone, setTempPhone] = useState(phone);
  const [tempCompany, setTempCompany] = useState(company);

  // Social links
  const [socials, setSocials] = useState<SocialLink[]>(INITIAL_SOCIALS);
  const [isEditingSocials, setIsEditingSocials] = useState(false);
  const [tempSocials, setTempSocials] = useState<SocialLink[]>(socials);

  // Connections
  const [connections, setConnections] = useState<Connection[]>(INITIAL_CONNECTIONS);
  const [requests, setRequests] = useState<Connection[]>(INCOMING_REQUESTS);
  const [suggestions, setSuggestions] = useState<Connection[]>(SUGGESTIONS);
  const [activeTab, setActiveTab] = useState<'connections' | 'requests' | 'suggestions'>('connections');
  const [connSearch, setConnSearch] = useState('');

  // Posts
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newPostContent, setNewPostContent] = useState('');
  const [isWritingPost, setIsWritingPost] = useState(false);
  const [postMenuOpen, setPostMenuOpen] = useState<string | null>(null);
  const [postVisibility, setPostVisibility] = useState<'everyone' | 'connections' | 'only-me'>('everyone');
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── Bio handlers ─────────────────────────────────────────────── */
  const startEditBio = () => { setTempBio(bio); setIsEditingBio(true); };
  const saveBio = () => {
    setBio(tempBio);
    setIsEditingBio(false);
    setSavedBio(true);
    setTimeout(() => setSavedBio(false), 2000);
  };
  const cancelEditBio = () => { setIsEditingBio(false); };

  /* ── Info handlers ────────────────────────────────────────────── */
  const startEditInfo = () => {
    setTempFirstName(firstName); setTempLastName(lastName);
    setTempHeadline(headline);   setTempLocation(location);
    setTempWebsite(website);     setTempPhone(phone);
    setTempCompany(company);
    setIsEditingInfo(true);
  };
  const saveInfo = () => {
    setFirstName(tempFirstName); setLastName(tempLastName);
    setDisplayName(`${tempFirstName} ${tempLastName}`);
    setHeadline(tempHeadline);   setLocation(tempLocation);
    setWebsite(tempWebsite);     setPhone(tempPhone);
    setCompany(tempCompany);
    setIsEditingInfo(false);
    setSavedInfo(true);
    setTimeout(() => setSavedInfo(false), 2000);
  };
  const cancelEditInfo = () => setIsEditingInfo(false);

  /* ── Social handlers ─────────────────────────────────────────── */
  const startEditSocials = () => { setTempSocials([...socials]); setIsEditingSocials(true); };
  const saveSocials = () => { setSocials(tempSocials); setIsEditingSocials(false); };
  const cancelEditSocials = () => setIsEditingSocials(false);
  const updateSocialField = (id: string, field: keyof SocialLink, value: string) => {
    setTempSocials(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };
  const removeSocial = (id: string) => setTempSocials(prev => prev.filter(s => s.id !== id));
  const addSocial = () => {
    const newId = `new_${Date.now()}`;
    setTempSocials(prev => [...prev, { id: newId, platform: 'Website', handle: '', url: '' }]);
  };

  /* ── Connection handlers ─────────────────────────────────────── */
  const acceptRequest = (id: string) => {
    const req = requests.find(r => r.id === id);
    if (req) {
      setConnections(prev => [...prev, { ...req, status: 'connected' }]);
      setRequests(prev => prev.filter(r => r.id !== id));
    }
  };
  const declineRequest = (id: string) => setRequests(prev => prev.filter(r => r.id !== id));
  const connectSuggestion = (id: string) => {
    setSuggestions(prev => prev.map(s => s.id === id ? { ...s, status: 'pending' } : s));
  };

  const filteredConnections = connections.filter(c =>
    c.name.toLowerCase().includes(connSearch.toLowerCase()) ||
    c.role.toLowerCase().includes(connSearch.toLowerCase())
  );

  /* ── Post handlers ─────────────────────────────────────────────── */
  const submitPost = (asDraft = false) => {
    if (!newPostContent.trim()) return;
    const newPost: Post = {
      id: `p${Date.now()}`,
      content: newPostContent.trim(),
      image: mediaPreview ?? undefined,
      likes: 0, comments: 0, shares: 0,
      timestamp: asDraft ? 'Draft · saved' : 'Just now',
      liked: false, saved: asDraft,
      visibility: postVisibility,
    };
    setPosts(prev => [newPost, ...prev]);
    setNewPostContent('');
    setIsWritingPost(false);
    setMediaPreview(null);
    setPostVisibility('everyone');
  };
  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setMediaPreview(url);
  };
  const toggleLike = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id
      ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) }
      : p
    ));
  };
  const toggleSave = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, saved: !p.saved } : p));
  };
  const deletePost = (id: string) => setPosts(prev => prev.filter(p => p.id !== id));

  const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`;

  /* ── Tier Preview handlers ─────────────────────────────────────── */
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    
    <div className={styles.page}>
      <Header />

      {/* Banner */}
      <div className={styles.bannerWrapper}>
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #1A1A1A 0%, #2d2d2d 40%, #FFDD00 100%)',
            opacity: 0.9,
          }}
        />
        <button className={styles.bannerEditBtn} aria-label="Edit banner">
          <Camera size={14} /> Edit Banner
        </button>
      </div>

      <div className={styles.pageBody}>

        {/* Profile Header Card */}
        <div className={styles.profileCard}>
          <div className={styles.avatarRow}>
            <div className={styles.avatarWrapper}>
              <div
                className={styles.avatar}
                style={{ background: 'linear-gradient(135deg,#1A1A1A,#FFDD00)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <span style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', fontFamily: 'inherit' }}>{initials}</span>
              </div>
              <button className={styles.avatarEditOverlay} aria-label="Change avatar">
                <Camera size={14} />
              </button>
            </div>

            <div className={styles.profileHeaderActions}>
              <button 
                onClick={() => setIsModalOpen(true)}
                className={styles.viewMembershipBtn}
              >
                View Membership
              </button>
              <button className={styles.editProfileBtn} onClick={startEditInfo}>
                <Edit2 size={14} /> Edit Profile
              </button>
            </div>
          </div>

          <div className={styles.profileMeta}>
            <h1 className={styles.profileName}>{displayName}</h1>
            <p className={styles.profileTitle}>{headline}</p>
            <div className={styles.profileMetaRow}>
              {location && (
                <span className={styles.metaItem}><MapPin size={14} />{location}</span>
              )}
              {company && (
                <span className={styles.metaItem}><Briefcase size={14} />{company}</span>
              )}
              {website && (
                <a href={website} target="_blank" rel="noopener noreferrer" className={styles.metaItem} style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>
                  <Globe size={14} />{website.replace(/^https?:\/\//, '')}
                </a>
              )}
              <span className={styles.metaItem}><Calendar size={14} />Joined {joinDate}</span>
            </div>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{connections.length}</span>
              <span className={styles.statLabel}>Connections</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>2.4k</span>
              <span className={styles.statLabel}>Followers</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>48</span>
              <span className={styles.statLabel}>Posts</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>12k</span>
              <span className={styles.statLabel}>Views</span>
            </div>
          </div>
        </div>

        <EditorialModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          maxWidth="1100px"
          title="Select Your Membership"
        >
          <TierSelection isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </EditorialModal>
        
        {/* Two columns */}
        <div className={styles.columns}>

          {/* ── LEFT COLUMN ─────────────────────────────────────── */}
          <div className={styles.leftCol}>

            {/* About */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>About</h2>
                {!isEditingBio && (
                  <button className={styles.cardEditBtn} onClick={startEditBio}>
                    <Edit2 size={13} /> Edit
                  </button>
                )}
              </div>
              <div className={styles.cardBody}>
                {isEditingBio ? (
                  <>
                    <textarea
                      className={styles.bioTextarea}
                      value={tempBio}
                      onChange={e => setTempBio(e.target.value)}
                      rows={5}
                      maxLength={500}
                    />
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
                      {tempBio.length}/500
                    </p>
                    <div className={styles.btnGroup}>
                      <button className={styles.saveBtn} onClick={saveBio}>
                        <Check size={14} /> Save
                      </button>
                      <button className={styles.cancelBtn} onClick={cancelEditBio}>
                        <X size={14} /> Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <p className={styles.bioText}>{bio}</p>
                )}
                {savedBio && !isEditingBio && (
                  <p style={{ fontSize: '0.78rem', color: '#00C853', fontWeight: 700, marginTop: '0.5rem' }}>
                    ✓ Bio saved
                  </p>
                )}
              </div>
            </div>

            {/* Personal Info */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Personal Information</h2>
                {!isEditingInfo && (
                  <button className={styles.cardEditBtn} onClick={startEditInfo}>
                    <Edit2 size={13} /> Edit
                  </button>
                )}
              </div>
              <div className={styles.cardBody}>
                {isEditingInfo ? (
                  <div className={styles.formGrid}>
                    <div className={styles.formRow}>
                      <div>
                        <label className={styles.fieldLabel}>First Name</label>
                        <input className={styles.fieldInput} value={tempFirstName} onChange={e => setTempFirstName(e.target.value)} />
                      </div>
                      <div>
                        <label className={styles.fieldLabel}>Last Name</label>
                        <input className={styles.fieldInput} value={tempLastName} onChange={e => setTempLastName(e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label className={styles.fieldLabel}>Headline</label>
                      <input className={styles.fieldInput} value={tempHeadline} onChange={e => setTempHeadline(e.target.value)} />
                    </div>
                    <div>
                      <label className={styles.fieldLabel}>Email</label>
                      <input className={styles.fieldInput} value={email} disabled style={{ opacity: 0.5 }} />
                    </div>
                    <div>
                      <label className={styles.fieldLabel}>Phone</label>
                      <input className={styles.fieldInput} value={tempPhone} onChange={e => setTempPhone(e.target.value)} />
                    </div>
                    <div>
                      <label className={styles.fieldLabel}>Company / Brand</label>
                      <input className={styles.fieldInput} value={tempCompany} onChange={e => setTempCompany(e.target.value)} />
                    </div>
                    <div>
                      <label className={styles.fieldLabel}>Location</label>
                      <input className={styles.fieldInput} value={tempLocation} onChange={e => setTempLocation(e.target.value)} />
                    </div>
                    <div>
                      <label className={styles.fieldLabel}>Website</label>
                      <input className={styles.fieldInput} type="url" value={tempWebsite} onChange={e => setTempWebsite(e.target.value)} placeholder="https://" />
                    </div>
                    <div className={styles.btnGroup}>
                      <button className={`${styles.saveBtn} ${savedInfo ? styles.saveBtnSuccess : ''}`} onClick={saveInfo}>
                        <Check size={14} /> {savedInfo ? 'Saved!' : 'Save Changes'}
                      </button>
                      <button className={styles.cancelBtn} onClick={cancelEditInfo}>
                        <X size={14} /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {[
                      { icon: <User size={15} />, label: 'Full Name', value: displayName },
                      { icon: <Mail size={15} />, label: 'Email', value: email },
                      { icon: <Phone size={15} />, label: 'Phone', value: phone },
                      { icon: <Briefcase size={15} />, label: 'Company', value: company },
                      { icon: <MapPin size={15} />, label: 'Location', value: location },
                      { icon: <Globe size={15} />, label: 'Website', value: website },
                    ].map((row, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <span style={{ color: 'var(--text-secondary)', marginTop: '2px', flexShrink: 0 }}>{row.icon}</span>
                        <div>
                          <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', margin: 0 }}>
                            {row.label}
                          </p>
                          <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0, marginTop: '1px' }}>
                            {row.value || '—'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Social Links</h2>
                {!isEditingSocials && (
                  <button className={styles.cardEditBtn} onClick={startEditSocials}>
                    <Edit2 size={13} /> Edit
                  </button>
                )}
              </div>
              <div className={styles.cardBody}>
                {isEditingSocials ? (
                  <div className={styles.socialEditForm}>
                    {tempSocials.map(s => {
                      const cfg = PLATFORM_CONFIG[s.platform] ?? PLATFORM_CONFIG['Website'];
                      return (
                        <div key={s.id} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <select
                            className={styles.socialPlatformSelect}
                            value={s.platform}
                            onChange={e => updateSocialField(s.id, 'platform', e.target.value)}
                            style={{ flex: '0 0 110px' }}
                          >
                            {PLATFORM_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                          <input
                            className={styles.fieldInput}
                            style={{ flex: 1 }}
                            placeholder="Handle or URL"
                            value={s.handle}
                            onChange={e => {
                              updateSocialField(s.id, 'handle', e.target.value);
                              updateSocialField(s.id, 'url', e.target.value);
                            }}
                          />
                          <button className={styles.socialDeleteBtn} onClick={() => removeSocial(s.id)} aria-label="Remove">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      );
                    })}
                    <button className={styles.addSocialBtn} onClick={addSocial}>
                      <Plus size={15} /> Add Link
                    </button>
                    <div className={styles.btnGroup}>
                      <button className={styles.saveBtn} onClick={saveSocials}><Check size={14} /> Save</button>
                      <button className={styles.cancelBtn} onClick={cancelEditSocials}><X size={14} /> Cancel</button>
                    </div>
                  </div>
                ) : socials.length === 0 ? (
                  <p className={styles.bioText} style={{ textAlign: 'center' }}>No social links added yet.</p>
                ) : (
                  <div className={styles.socialList}>
                    {socials.map(s => {
                      const cfg = PLATFORM_CONFIG[s.platform] ?? PLATFORM_CONFIG['Website'];
                      return (
                        <a
                          key={s.id}
                          href={s.url.startsWith('http') ? s.url : `https://${s.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.socialItem}
                        >
                          <div className={styles.socialIconWrap} style={{ background: cfg.bg, color: cfg.color }}>
                            {cfg.icon}
                          </div>
                          <div className={styles.socialInfo}>
                            <p className={styles.socialPlatform}>{s.platform}</p>
                            <p className={styles.socialHandle}>{s.handle}</p>
                          </div>
                          <ExternalLink size={14} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* ── CENTER COLUMN — Posts ─────────────────────────────── */}
          <div className={styles.centerCol}>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Posts</h2>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {posts.length} posts
                </span>
              </div>

              {/* Compose */}
              <div className={styles.postCompose}>
                <div
                  className={styles.postAvatar}
                  style={{ background: 'linear-gradient(135deg,#1A1A1A,#FFDD00)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fff' }}>{initials}</span>
                </div>
                {isWritingPost ? (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <textarea
                      className={styles.postTextarea}
                      placeholder="What's on your mind?"
                      value={newPostContent}
                      onChange={e => setNewPostContent(e.target.value)}
                      rows={3}
                      autoFocus
                    />
                    {/* Media preview */}
                    {mediaPreview && (
                      <div className={styles.mediaPreviewWrap}>
                        <img src={mediaPreview} alt="preview" className={styles.mediaPreviewImg} />
                        <button
                          className={styles.mediaRemoveBtn}
                          onClick={() => setMediaPreview(null)}
                          aria-label="Remove media"
                          type="button"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    {/* Toolbar: media + visibility */}
                    <div className={styles.postToolbar}>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*"
                        style={{ display: 'none' }}
                        onChange={handleMediaChange}
                      />
                      <button
                        className={styles.postToolbarBtn}
                        onClick={() => fileInputRef.current?.click()}
                        title="Add photo / video"
                        type="button"
                      >
                        <Image size={15} />
                      </button>
                      <select
                        className={styles.visibilitySelect}
                        value={postVisibility}
                        onChange={e => setPostVisibility(e.target.value as 'everyone' | 'connections' | 'only-me')}
                      >
                        <option value="everyone">🌐 Everyone</option>
                        <option value="connections">👥 Connections</option>
                        <option value="only-me">🔒 Only me</option>
                      </select>
                    </div>
                    <div className={styles.btnGroup}>
                      <button className={styles.saveBtn} onClick={() => submitPost(true)}>
                        <Bookmark size={14} /> Save Draft
                      </button>
                      <button className={styles.saveBtn} onClick={() => submitPost(false)} disabled={!newPostContent.trim()}>
                        <Check size={14} /> Post
                      </button>
                      <button className={styles.cancelBtn} onClick={() => { setIsWritingPost(false); setNewPostContent(''); setMediaPreview(null); }}>
                        <X size={14} /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button className={styles.postComposeTrigger} onClick={() => setIsWritingPost(true)}>
                    What's on your mind?
                  </button>
                )}
              </div>

              {/* Posts Feed */}
              <div className={styles.postFeed}>
                {posts.map(post => (
                  <div key={post.id} className={styles.postCard}>
                    <div className={styles.postCardHeader}>
                      <div
                        className={styles.postAvatar}
                        style={{ background: 'linear-gradient(135deg,#1A1A1A,#FFDD00)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                      >
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fff' }}>{initials}</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className={styles.postAuthor}>{displayName}</p>
                        <p className={styles.postTime}>{post.timestamp}</p>
                      </div>
                      {/* 3-dot menu */}
                      <div style={{ position: 'relative' }}>
                        <button
                          className={styles.postMenuBtn}
                          onClick={() => setPostMenuOpen(postMenuOpen === post.id ? null : post.id)}
                          aria-label="Post options"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                        {postMenuOpen === post.id && (
                          <div className={styles.postMenuDropdown}>
                            <button
                              className={styles.postMenuDropdownItem}
                              onClick={() => setPostMenuOpen(null)}
                            >
                              <Share2 size={14} /> Share
                            </button>
                            <button
                              className={styles.postMenuDropdownItem}
                              onClick={() => setPostMenuOpen(null)}
                            >
                              {post.visibility === 'connections'
                                ? <Users size={14} />
                                : post.visibility === 'only-me'
                                ? <Lock size={14} />
                                : <Globe size={14} />}{' '}
                              {post.visibility === 'connections'
                                ? 'Connections only'
                                : post.visibility === 'only-me'
                                ? 'Only me'
                                : 'Everyone'}
                            </button>
                            <button
                              className={`${styles.postMenuDropdownItem} ${styles.postMenuDropdownItemDanger}`}
                              onClick={() => { deletePost(post.id); setPostMenuOpen(null); }}
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className={styles.postContent}>{post.content}</p>
                    {post.image && (
                      <div className={styles.postImageWrap}>
                        <img src={post.image} alt="" className={styles.postImage} />
                      </div>
                    )}
                    <div className={styles.postActions}>
                      <button
                        className={`${styles.postAction} ${post.liked ? styles.postActionLiked : ''}`}
                        onClick={() => toggleLike(post.id)}
                      >
                        <Heart size={15} fill={post.liked ? 'currentColor' : 'none'} />
                        <span>{post.likes}</span>
                      </button>
                      <button className={styles.postAction}>
                        <MessageCircle size={15} />
                        <span>{post.comments}</span>
                      </button>
                      <button className={styles.postAction}>
                        <Share2 size={15} />
                        <span>{post.shares}</span>
                      </button>
                      <button
                        className={`${styles.postAction} ${styles.postActionSave} ${post.saved ? styles.postActionSaved : ''}`}
                        onClick={() => toggleSave(post.id)}
                        title={post.saved ? 'Unsave' : 'Save'}
                      >
                        <Bookmark size={15} fill={post.saved ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>
                ))}
                {posts.length === 0 && (
                  <div className={styles.emptyState}>No posts yet. Share something!</div>
                )}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN — Network sidebar ───────────────────── */}
          <div className={styles.rightCol}>

            {/* Network Card */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <h2 className={styles.cardTitle} style={{ margin: 0 }}>Network</h2>
                  <span className={styles.networkBadge}>{connections.length}</span>
                  {requests.length > 0 && (
                    <span className={styles.networkRequestBadge}>{requests.length} new</span>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className={styles.tabs}>
                {(
                  [
                    { key: 'connections', label: 'Connections', count: connections.length },
                    { key: 'requests',    label: 'Requests',    count: requests.length },
                    { key: 'suggestions', label: 'Suggest',     count: suggestions.length },
                  ] as const
                ).map(t => (
                  <button
                    key={t.key}
                    className={`${styles.tab} ${activeTab === t.key ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab(t.key)}
                  >
                    {t.label}
                    {t.count > 0 && <span className={styles.tabCount}>{t.count}</span>}
                  </button>
                ))}
              </div>

              {/* Incoming requests banner */}
              {activeTab === 'connections' && requests.length > 0 && (
                <div className={styles.requestBanner}>
                  <span className={styles.requestBannerText}>
                    <UserPlus size={15} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }} />
                    {requests.length} pending connection {requests.length === 1 ? 'request' : 'requests'}
                  </span>
                  <div className={styles.requestBannerActions}>
                    <button className={styles.connBtnPrimary} onClick={() => setActiveTab('requests')}>
                      View
                    </button>
                  </div>
                </div>
              )}

              {/* Search */}
              {activeTab === 'connections' && (
                <div className={styles.searchWrapper}>
                  <Search size={15} className={styles.searchIcon} />
                  <input
                    className={styles.searchInput}
                    placeholder="Search connections..."
                    value={connSearch}
                    onChange={e => setConnSearch(e.target.value)}
                  />
                </div>
              )}

              {/* Connections grid */}
              {activeTab === 'connections' && (
                filteredConnections.length > 0 ? (
                  <div className={styles.connectionGrid}>
                    {filteredConnections.map(c => (
                      <ConnectionCard key={c.id} conn={c} />
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    {connSearch ? 'No connections match your search.' : 'No connections yet.'}
                  </div>
                )
              )}

              {activeTab === 'requests' && (
                requests.length > 0 ? (
                  <div className={styles.connectionGrid}>
                    {requests.map(r => (
                      <ConnectionCard key={r.id} conn={r} onAccept={acceptRequest} onDecline={declineRequest} />
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>No pending connection requests.</div>
                )
              )}

              {activeTab === 'suggestions' && (
                suggestions.length > 0 ? (
                  <div className={styles.connectionGrid}>
                    {suggestions.map(s => (
                      <ConnectionCard key={s.id} conn={s} onConnect={connectSuggestion} />
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>No suggestions right now.</div>
                )
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
