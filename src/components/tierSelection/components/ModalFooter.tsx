"use client";

import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import styles from './ModalFooter.module.css';

interface ModalFooterProps {
  selectedTierName: string;
  price: string;
  billingCycle: 'monthly' | 'yearly';
  onConfirm: () => void;
  isLoading?: boolean;
}

export const ModalFooter = ({ 
  selectedTierName, 
  price, 
  billingCycle, 
  onConfirm,
  isLoading = false 
}: ModalFooterProps) => {
  return (
    <footer className={styles.footer}>
      {/* Selection Summary */}
      <div className={styles.summaryInfo}>
        <span className={styles.selectionLabel}>Your Selection</span>
        <div className={styles.tierSummary}>
          <span className={styles.tierName}>{selectedTierName}</span>
          <span className={styles.price}>{price}</span>
          <span className={styles.period}>
            /{billingCycle === 'monthly' ? 'mo' : 'yr'}
          </span>
        </div>
      </div>

      {/* Action Buttons & Security */}
      <div className={styles.actions}>
        <div className={styles.secureText}>
          <ShieldCheck size={16} strokeWidth={1.5} />
          <span>Secure Checkout</span>
        </div>

        <button 
          onClick={onConfirm} 
          disabled={isLoading}
          className={styles.primaryButton}
        >
          {isLoading ? (
            <span className="animate-pulse">Processing...</span>
          ) : (
            <>
              <span>Proceed to Payment</span>
              <ArrowRight size={18} strokeWidth={2} />
            </>
          )}
        </button>
      </div>
    </footer>
  );
};