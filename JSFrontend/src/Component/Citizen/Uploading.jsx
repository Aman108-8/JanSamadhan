import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Camera, Plus, Trash2, CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { deleteProblem, uploadProblemMedia } from './config/PublicApi';

/* =========================================
   UPLODING — STEP 2: PHOTOS & VIDEOS
   Attaches media files to the problem created in Step 1 (RProblem.jsx)
========================================= */
const Uploading = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]); // { id, file, previewUrl, type: 'image' | 'video', status, error }
  const [finishing, setFinishing] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [finishError, setFinishError] = useState('');
  const [cancelError, setCancelError] = useState('');

  const fileMultiInputRef = useRef(null);
  const updateInputRef = useRef(null);
  const selectedItemRef = useRef(null);

  const typeOf = (file) => (file.type.startsWith('video/') ? 'video' : 'image');

  // Open multi-file picker
  const handleAddClick = () => {
    fileMultiInputRef.current.click();
  };

  // Open single-file picker to swap a specific item
  const handleItemClick = (itemId) => {
    selectedItemRef.current = itemId;
    updateInputRef.current.click();
  };

  // Append newly selected photos/videos (with local previews)
  const handleAddItems = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newItems = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      previewUrl: URL.createObjectURL(file),
      type: typeOf(file),
      name: file.name,
      status: 'pending', // pending | uploading | done | error
      error: null,
    }));

    setItems((prev) => [...prev, ...newItems]);
    e.target.value = ''; // allow re-selecting the same file
  };

  // Replace a specific item
  const handleUpdateItem = (e) => {
    const file = e.target.files[0];
    if (!file || !selectedItemRef.current) return;

    setItems((prev) =>
      prev.map((it) => {
        if (it.id === selectedItemRef.current) {
          URL.revokeObjectURL(it.previewUrl);
          return {
            ...it,
            file,
            previewUrl: URL.createObjectURL(file),
            type: typeOf(file),
            name: file.name,
            status: 'pending',
            error: null,
          };
        }
        return it;
      })
    );
    e.target.value = '';
  };

  // Remove an item before it's uploaded
  const handleDeleteItem = (itemId) => {
    setItems((prev) => {
      const toDelete = prev.find((it) => it.id === itemId);
      if (toDelete) URL.revokeObjectURL(toDelete.previewUrl);
      return prev.filter((it) => it.id !== itemId);
    });
  };

  // Upload one file against the real problemId, tracking its own status
  const uploadOne = async (item) => {
    setItems((prev) =>
      prev.map((it) => (it.id === item.id ? { ...it, status: 'uploading', error: null } : it))
    );

    try {
      await uploadProblemMedia(problemId, item.file);
      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, status: 'done' } : it))
      );
      return true;
    } catch {
      setItems((prev) =>
        prev.map((it) =>
          it.id === item.id
            ? { ...it, status: 'error', error: 'Upload failed' }
            : it
        )
      );
      return false;
    }
  };

  const retryUpload = (item) => {
    uploadOne(item);
  };

  // Upload everything not already done, then move on
  const handleFinish = async () => {
    setFinishError('');
    setFinishing(true);

    const pending = items.filter((it) => it.status !== 'done');
    const results = await Promise.all(pending.map((it) => uploadOne(it)));

    setFinishing(false);

    if (results.some((ok) => !ok)) {
      setFinishError('Some files failed to upload. You can retry them below, or skip and finish anyway.');
      return;
    }

    navigate('/my-problems');
  };

  const handleSkip = () => {
    navigate('/my-problems');
  };

  const handleCancel = async () => {
    const confirmed = window.confirm(
      'Cancel this problem report? The report and any uploaded media will be deleted.'
    );
    if (!confirmed) return;

    setCancelError('');
    setCancelling(true);

    try {
      await deleteProblem(problemId);
      items.forEach((item) => URL.revokeObjectURL(item.previewUrl));
      navigate('/my-problems');
    } catch {
      setCancelling(false);
      setCancelError('Unable to cancel the report. Please try again.');
    }
  };

  const anyUploading = items.some((it) => it.status === 'uploading') || finishing || cancelling;

  return (
    <div
      style={{
        background: '#fff',
        minHeight: '100vh',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        padding: '28px 40px 40px',
      }}
    >
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            marginBottom: 22,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: '#DCFCE7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Camera size={19} color="#15803D" strokeWidth={2} />
          </div>

          <div>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 800,
                margin: 0,
                color: '#111827',
              }}
            >
              Add Photos &amp; Videos{' '}
              <span style={{ fontWeight: 700, color: '#374151' }}>
                (फ़ोटो और वीडियो जोड़ें)
              </span>
            </h1>
            <p style={{ fontSize: 13, color: '#6B7280', margin: '4px 0 0' }}>
              Step 2 of 2 — Your problem has been saved. Add evidence now, or skip and add it later.
            </p>
          </div>
        </div>

        {/* Drop area */}
        <div
          onClick={handleAddClick}
          style={{
            border: '1.5px dashed #D1D5DB',
            borderRadius: 10,
            padding: '24px 12px',
            textAlign: 'center',
            background: '#FAFAFA',
            cursor: 'pointer',
            transition: 'background 0.2s',
            marginBottom: 18,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#F0FDF4')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#FAFAFA')}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#DCFCE7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 8px',
            }}
          >
            <Camera size={17} color="#15803D" />
          </div>

          <div style={{ fontSize: 13, fontWeight: 700, color: '#15803D' }}>
            Click to add photos or videos
          </div>

          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 3 }}>
            Supports multiple files. Click any item to replace it, or use the trash icon to remove.
          </div>
        </div>

        {/* Gallery */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            flexWrap: 'wrap',
            marginBottom: 24,
          }}
        >
          {items.map((item) => (
            <div key={item.id} style={{ width: 96 }}>
              <div
                onClick={() => handleItemClick(item.id)}
                className="group"
                style={{
                  position: 'relative',
                  width: 96,
                  height: 72,
                  borderRadius: 6,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid #E5E7EB',
                }}
              >
                {item.type === 'video' ? (
                  <video
                    src={item.previewUrl}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    muted
                  />
                ) : (
                  <img
                    src={item.previewUrl}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}

                {/* Status overlay */}
                {item.status === 'uploading' && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.45)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Loader2 size={18} color="#fff" className="animate-spin" />
                  </div>
                )}
                {item.status === 'done' && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 3,
                      right: 3,
                      background: '#fff',
                      borderRadius: '50%',
                    }}
                  >
                    <CheckCircle2 size={16} color="#16A34A" fill="#DCFCE7" />
                  </div>
                )}

                {/* Delete button — hidden once uploaded successfully */}
                {item.status !== 'done' && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteItem(item.id);
                    }}
                    style={{
                      position: 'absolute',
                      top: 2,
                      right: 2,
                      background: '#EF4444',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      width: 18,
                      height: 18,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 10,
                    }}
                    title="Remove"
                  >
                    <Trash2 size={10} />
                  </button>
                )}
              </div>

              {item.status === 'error' && (
                <button
                  type="button"
                  onClick={() => retryUpload(item)}
                  style={{
                    marginTop: 4,
                    fontSize: 10.5,
                    color: '#DC2626',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Failed — retry
                </button>
              )}
            </div>
          ))}

          {/* Add More tile */}
          <div
            onClick={handleAddClick}
            style={{
              width: 72,
              height: 72,
              borderRadius: 6,
              border: '1.5px dashed #D1D5DB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#9CA3AF',
              cursor: 'pointer',
            }}
            title="Add more"
          >
            <Plus size={20} />
          </div>
        </div>

        {/* Hidden file inputs */}
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          ref={fileMultiInputRef}
          onChange={handleAddItems}
          style={{ display: 'none' }}
        />
        <input
          type="file"
          accept="image/*,video/*"
          ref={updateInputRef}
          onChange={handleUpdateItem}
          style={{ display: 'none' }}
        />

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 20,
            borderTop: '1px solid #F3F4F6',
          }}
        >
          <button
            type="button"
            onClick={handleCancel}
            disabled={anyUploading}
            style={{
              background: 'transparent',
              color: '#B91C1C',
              border: '1px solid #FECACA',
              borderRadius: 7,
              padding: '9px 12px',
              fontSize: 12,
              fontWeight: 600,
              cursor: anyUploading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              opacity: anyUploading ? 0.6 : 1,
            }}
          >
            <XCircle size={15} />
            {cancelling ? 'CANCELLING...' : 'Cancel report'}
          </button>

          <button
            type="button"
            onClick={handleSkip}
            disabled={anyUploading}
            style={{
              background: 'transparent',
              color: '#6B7280',
              border: 'none',
              fontSize: 13,
              fontWeight: 600,
              cursor: anyUploading ? 'not-allowed' : 'pointer',
            }}
          >
            Skip for now
          </button>

          <button
            type="button"
            onClick={handleFinish}
            disabled={anyUploading}
            style={{
              background: '#14532D',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '13px 26px',
              fontSize: 13.5,
              fontWeight: 700,
              cursor: anyUploading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              opacity: anyUploading ? 0.7 : 1,
            }}
          >
            {finishing ? 'UPLOADING...' : 'FINISH ✓'}
          </button>
        </div>

        {finishError && (
          <div style={{ marginTop: 10, fontSize: 11.5, color: '#DC2626' }}>
            {finishError}
          </div>
        )}

        {cancelError && (
          <div style={{ marginTop: 10, fontSize: 11.5, color: '#DC2626' }}>
            {cancelError}
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploading;