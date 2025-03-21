'use client';

import { CounterIDL, getCounterProgramId } from '@3synx.in/anchor';
import { Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';

export function useCounterProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getCounterProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = new Program(CounterIDL, programId, provider);

  const accounts = useQuery({
    queryKey: ['counter', 'all', { cluster }],
    queryFn: () => program.account.counter.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const initialize = useMutation({
    mutationKey: ['counter', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods
        .initializeCounter()
        .accounts({ counter: keypair.publicKey })
        .signers([keypair])
        .rpc(),
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error('Failed to initialize counter'),
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  };
}

export function useCounterProgramAccount({ counter }: { counter: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = useCounterProgram();

  const account = useQuery({
    queryKey: ['counter', 'fetch', { cluster, counter }],
    queryFn: () => program.account.counter.fetch(counter),
  });

  const close = useMutation({
    mutationKey: ['counter', 'close', { cluster, counter }],
    mutationFn: () =>
      program.methods.closeCounter().accounts({ counter }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });

  const decrement = useMutation({
    mutationKey: ['counter', 'decrement', { cluster, counter }],
    mutationFn: () => program.methods.decrement().accounts({ counter }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return account.refetch();
    },
  });

  const increment = useMutation({
    mutationKey: ['counter', 'increment', { cluster, counter }],
    mutationFn: () => program.methods.increment().accounts({ counter }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return account.refetch();
    },
  });

  const set = useMutation({
    mutationKey: ['counter', 'set', { cluster, counter }],
    mutationFn: (value: number) =>
      program.methods.set(value).accounts({ counter }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return account.refetch();
    },
  });

  return {
    account,
    close,
    decrement,
    increment,
    set,
  };
}
